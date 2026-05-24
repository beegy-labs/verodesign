import { css, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { VdsElement } from '../../base/vds-element.js';

type FirstDayOfWeek = 'mon' | 'sun';

type GridCell = {
  iso: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  weekday: number;
};

const WEEKDAY_LABELS: Record<FirstDayOfWeek, string[]> = {
  mon: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  sun: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

export class VdsDateGrid extends VdsElement {
  static styles = css`
    :host {
      display: block;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }

    .header-row,
    .row {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }

    .header-row {
      margin-block-end: var(--vds-spacing-3);
    }

    .weekday {
      color: var(--vds-exp-girok-redesign-calendar-weekday-color);
      font-size: var(--vds-exp-girok-redesign-font-size-micro);
      font-weight: var(--vds-font-weight-bold);
      text-align: center;
    }

    .weekday[data-weekend="sat"] {
      color: var(--vds-exp-girok-redesign-calendar-weekend-sat);
    }

    .weekday[data-weekend="sun"] {
      color: var(--vds-exp-girok-redesign-calendar-weekend-sun);
    }

    .cell {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-block-size: calc(var(--vds-exp-girok-redesign-calendar-cell-size) + var(--vds-spacing-2));
    }

    button {
      all: unset;
      box-sizing: border-box;
      display: grid;
      place-items: center;
      inline-size: var(--vds-exp-girok-redesign-calendar-cell-size);
      min-inline-size: var(--vds-exp-girok-redesign-calendar-cell-size);
      block-size: var(--vds-exp-girok-redesign-calendar-cell-size);
      border-radius: var(--vds-radius-xl);
      color: var(--_day-color);
      cursor: pointer;
      position: relative;
      font-size: var(--vds-type-role-body-size, 0.875rem);
      font-weight: var(--vds-font-weight-semibold);
      border: var(--vds-border-width-1) solid transparent;
    }

    button[data-outside-month="true"] {
      opacity: 0.35;
    }

    button[data-selected="true"] {
      background: var(--vds-exp-girok-redesign-calendar-selected-bg);
      color: var(--vds-exp-girok-redesign-calendar-selected-fg);
      border-color: var(--vds-exp-girok-redesign-calendar-selected-border);
    }

    button:focus-visible {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }

    .dot {
      position: absolute;
      inset-inline-start: 50%;
      inset-block-end: var(--vds-spacing-1);
      inline-size: var(--vds-exp-girok-redesign-calendar-dot-size);
      block-size: var(--vds-exp-girok-redesign-calendar-dot-size);
      border-radius: var(--vds-radius-full);
      background: var(--vds-exp-girok-redesign-calendar-dot-color);
      transform: translateX(-50%);
    }
  `;

  @property({ type: Number }) year = new Date().getFullYear();
  @property({ type: Number }) month = new Date().getMonth() + 1;
  @property({ type: String, attribute: 'selected-date' }) selectedDate = '';
  @property({ type: String, attribute: 'dot-dates' }) dotDates = '';
  @property({ type: String, attribute: 'first-day-of-week' }) firstDayOfWeek: FirstDayOfWeek = 'mon';

  @state() private focusedDate = '';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'grid');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
  }

  protected updated(): void {
    setAriaProperty(this, this.internals, 'ariaLabel', `${this.year}-${String(this.month).padStart(2, '0')}`);
    if (!this.focusedDate) {
      this.focusedDate = this.selectedDate || this.todayIfCurrentMonth() || this.cells[0]?.iso || '';
    }
  }

  private todayIfCurrentMonth(): string {
    const today = new Date();
    if (today.getFullYear() !== this.year || today.getMonth() + 1 !== this.month) return '';
    return this.toIso(today);
  }

  private toIso(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private fromIso(iso: string): Date {
    const [year, month, day] = iso.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private weekendKind(weekdayIndex: number): 'sat' | 'sun' | '' {
    if (this.firstDayOfWeek === 'mon') {
      if (weekdayIndex === 5) return 'sat';
      if (weekdayIndex === 6) return 'sun';
      return '';
    }
    if (weekdayIndex === 0) return 'sun';
    if (weekdayIndex === 6) return 'sat';
    return '';
  }

  private get dotDateSet(): Set<string> {
    return new Set(
      this.dotDates
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
    );
  }

  private get cells(): GridCell[] {
    const firstOfMonth = new Date(this.year, this.month - 1, 1);
    const startOffset = this.firstDayOfWeek === 'mon'
      ? (firstOfMonth.getDay() + 6) % 7
      : firstOfMonth.getDay();
    const startDate = new Date(this.year, this.month - 1, 1 - startOffset);
    const lastOfMonth = new Date(this.year, this.month, 0);
    const endOffset = this.firstDayOfWeek === 'mon'
      ? (7 - ((lastOfMonth.getDay() + 6) % 7) - 1 + 7) % 7
      : (7 - lastOfMonth.getDay() - 1 + 7) % 7;
    const total = startOffset + lastOfMonth.getDate() + endOffset;
    const rowCount = Math.ceil(total / 7);
    const cells: GridCell[] = [];
    const todayIso = this.toIso(new Date());

    for (let index = 0; index < rowCount * 7; index += 1) {
      const current = new Date(startDate);
      current.setDate(startDate.getDate() + index);
      const iso = this.toIso(current);
      const weekday = index % 7;
      cells.push({
        iso,
        day: current.getDate(),
        inMonth: current.getMonth() + 1 === this.month,
        isToday: iso === todayIso,
        isSelected: iso === this.selectedDate,
        weekday,
      });
    }
    return cells;
  }

  private moveFocus(days: number): void {
    const base = this.focusedDate || this.selectedDate || this.cells[0]?.iso;
    if (!base) return;
    const date = this.fromIso(base);
    date.setDate(date.getDate() + days);
    this.focusedDate = this.toIso(date);
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-date]');
    if (!target) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.moveFocus(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.moveFocus(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveFocus(-7);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveFocus(7);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.moveFocus(-(this.fromIso(this.focusedDate || target.dataset.date || '').getDay() || 0));
    } else if (event.key === 'End') {
      event.preventDefault();
      this.moveFocus(6 - (this.fromIso(this.focusedDate || target.dataset.date || '').getDay() || 0));
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      this.emit('vds-month-change', {
        year: event.key === 'PageUp' ? this.prevMonth.year : this.nextMonth.year,
        month: event.key === 'PageUp' ? this.prevMonth.month : this.nextMonth.month,
      });
      return;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const iso = target.dataset.date;
      if (iso) this.selectDate(iso);
      return;
    } else {
      return;
    }

    this.updateComplete.then(() => {
      this.renderRoot.querySelector<HTMLButtonElement>(`button[data-date="${this.focusedDate}"]`)?.focus();
    });
  };

  private get prevMonth() {
    return this.month === 1 ? { year: this.year - 1, month: 12 } : { year: this.year, month: this.month - 1 };
  }

  private get nextMonth() {
    return this.month === 12 ? { year: this.year + 1, month: 1 } : { year: this.year, month: this.month + 1 };
  }

  private selectDate(iso: string): void {
    this.focusedDate = iso;
    this.emit('vds-date-select', { date: iso });
  }

  render() {
    const dotSet = this.dotDateSet;
    const rows = Array.from({ length: Math.ceil(this.cells.length / 7) }, (_, index) => this.cells.slice(index * 7, index * 7 + 7));

    return html`
      <div class="header-row" role="row">
        ${WEEKDAY_LABELS[this.firstDayOfWeek].map((label, index) => html`
          <div class="weekday" role="columnheader" data-weekend=${this.weekendKind(index)}>${label}</div>
        `)}
      </div>
      ${rows.map((row) => html`
        <div class="row" role="row">
          ${row.map((cell) => {
            const weekend = this.weekendKind(cell.weekday);
            const dayColor = cell.isSelected
              ? 'var(--vds-exp-girok-redesign-calendar-selected-fg)'
              : weekend === 'sat'
                ? 'var(--vds-exp-girok-redesign-calendar-weekend-sat)'
                : weekend === 'sun'
                  ? 'var(--vds-exp-girok-redesign-calendar-weekend-sun)'
                  : 'var(--vds-exp-girok-redesign-calendar-weekday-color)';
            const tabIndex = (this.focusedDate === cell.iso || (!this.focusedDate && cell.isSelected)) ? 0 : -1;

            return html`
              <div class="cell" role="gridcell" aria-selected=${String(cell.isSelected)}>
                <button
                  type="button"
                  data-date=${cell.iso}
                  data-selected=${String(cell.isSelected)}
                  data-outside-month=${String(!cell.inMonth)}
                  tabindex=${tabIndex}
                  aria-current=${cell.isToday ? 'date' : nothing}
                  style=${`--_day-color: ${dayColor};`}
                  @click=${() => this.selectDate(cell.iso)}
                >
                  <span>${cell.day}</span>
                  ${dotSet.has(cell.iso) ? html`<span class="dot" aria-hidden="true"></span>` : nothing}
                </button>
              </div>
            `;
          })}
        </div>
      `)}
    `;
  }
}
