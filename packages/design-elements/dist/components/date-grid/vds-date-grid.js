import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as d, nothing as y } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as l } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { state as k } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js";
import { setRole as D, setAriaProperty as w } from "../../utils/attribute-mirror.js";
import { VdsElement as b } from "../../base/vds-element.js";
import { css as x } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var S = Object.defineProperty, i = (u, e, s, r) => {
  for (var t = void 0, a = u.length - 1, o; a >= 0; a--)
    (o = u[a]) && (t = o(e, s, t) || t);
  return t && S(e, s, t), t;
};
const $ = {
  mon: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  sun: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
class n extends b {
  constructor() {
    super(), this.year = (/* @__PURE__ */ new Date()).getFullYear(), this.month = (/* @__PURE__ */ new Date()).getMonth() + 1, this.selectedDate = "", this.dotDates = "", this.firstDayOfWeek = "mon", this.focusedDate = "", this.handleKeydown = (e) => {
      const s = e.target.closest("button[data-date]");
      if (s) {
        if (e.key === "ArrowLeft")
          e.preventDefault(), this.moveFocus(-1);
        else if (e.key === "ArrowRight")
          e.preventDefault(), this.moveFocus(1);
        else if (e.key === "ArrowUp")
          e.preventDefault(), this.moveFocus(-7);
        else if (e.key === "ArrowDown")
          e.preventDefault(), this.moveFocus(7);
        else if (e.key === "Home")
          e.preventDefault(), this.moveFocus(-(this.fromIso(this.focusedDate || s.dataset.date || "").getDay() || 0));
        else if (e.key === "End")
          e.preventDefault(), this.moveFocus(6 - (this.fromIso(this.focusedDate || s.dataset.date || "").getDay() || 0));
        else if (e.key === "PageUp" || e.key === "PageDown") {
          e.preventDefault(), this.emit("vds-month-change", {
            year: e.key === "PageUp" ? this.prevMonth.year : this.nextMonth.year,
            month: e.key === "PageUp" ? this.prevMonth.month : this.nextMonth.month
          });
          return;
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const r = s.dataset.date;
          r && this.selectDate(r);
          return;
        } else
          return;
        this.updateComplete.then(() => {
          this.renderRoot.querySelector(`button[data-date="${this.focusedDate}"]`)?.focus();
        });
      }
    }, this.internals = this.attachInternals(), D(this, this.internals, "grid");
  }
  static {
    this.styles = x`
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
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.handleKeydown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this.handleKeydown);
  }
  updated() {
    w(this, this.internals, "ariaLabel", `${this.year}-${String(this.month).padStart(2, "0")}`), this.focusedDate || (this.focusedDate = this.selectedDate || this.todayIfCurrentMonth() || this.cells[0]?.iso || "");
  }
  todayIfCurrentMonth() {
    const e = /* @__PURE__ */ new Date();
    return e.getFullYear() !== this.year || e.getMonth() + 1 !== this.month ? "" : this.toIso(e);
  }
  toIso(e) {
    const s = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), t = String(e.getDate()).padStart(2, "0");
    return `${s}-${r}-${t}`;
  }
  fromIso(e) {
    const [s, r, t] = e.split("-").map(Number);
    return new Date(s, r - 1, t);
  }
  weekendKind(e) {
    return this.firstDayOfWeek === "mon" ? e === 5 ? "sat" : e === 6 ? "sun" : "" : e === 0 ? "sun" : e === 6 ? "sat" : "";
  }
  get dotDateSet() {
    return new Set(
      this.dotDates.split(",").map((e) => e.trim()).filter(Boolean)
    );
  }
  get cells() {
    const e = new Date(this.year, this.month - 1, 1), s = this.firstDayOfWeek === "mon" ? (e.getDay() + 6) % 7 : e.getDay(), r = new Date(this.year, this.month - 1, 1 - s), t = new Date(this.year, this.month, 0), a = this.firstDayOfWeek === "mon" ? (7 - (t.getDay() + 6) % 7 - 1 + 7) % 7 : (7 - t.getDay() - 1 + 7) % 7, o = s + t.getDate() + a, f = Math.ceil(o / 7), g = [], m = this.toIso(/* @__PURE__ */ new Date());
    for (let c = 0; c < f * 7; c += 1) {
      const h = new Date(r);
      h.setDate(r.getDate() + c);
      const p = this.toIso(h), v = c % 7;
      g.push({
        iso: p,
        day: h.getDate(),
        inMonth: h.getMonth() + 1 === this.month,
        isToday: p === m,
        isSelected: p === this.selectedDate,
        weekday: v
      });
    }
    return g;
  }
  moveFocus(e) {
    const s = this.focusedDate || this.selectedDate || this.cells[0]?.iso;
    if (!s) return;
    const r = this.fromIso(s);
    r.setDate(r.getDate() + e), this.focusedDate = this.toIso(r);
  }
  get prevMonth() {
    return this.month === 1 ? { year: this.year - 1, month: 12 } : { year: this.year, month: this.month - 1 };
  }
  get nextMonth() {
    return this.month === 12 ? { year: this.year + 1, month: 1 } : { year: this.year, month: this.month + 1 };
  }
  selectDate(e) {
    this.focusedDate = e, this.emit("vds-date-select", { date: e });
  }
  render() {
    const e = this.dotDateSet, s = Array.from({ length: Math.ceil(this.cells.length / 7) }, (r, t) => this.cells.slice(t * 7, t * 7 + 7));
    return d`
      <div class="header-row" role="row">
        ${$[this.firstDayOfWeek].map((r, t) => d`
          <div class="weekday" role="columnheader" data-weekend=${this.weekendKind(t)}>${r}</div>
        `)}
      </div>
      ${s.map((r) => d`
        <div class="row" role="row">
          ${r.map((t) => {
      const a = this.weekendKind(t.weekday), o = t.isSelected ? "var(--vds-exp-girok-redesign-calendar-selected-fg)" : a === "sat" ? "var(--vds-exp-girok-redesign-calendar-weekend-sat)" : a === "sun" ? "var(--vds-exp-girok-redesign-calendar-weekend-sun)" : "var(--vds-exp-girok-redesign-calendar-weekday-color)", f = this.focusedDate === t.iso || !this.focusedDate && t.isSelected ? 0 : -1;
      return d`
              <div class="cell" role="gridcell" aria-selected=${String(t.isSelected)}>
                <button
                  type="button"
                  data-date=${t.iso}
                  data-selected=${String(t.isSelected)}
                  data-outside-month=${String(!t.inMonth)}
                  tabindex=${f}
                  aria-current=${t.isToday ? "date" : y}
                  style=${`--_day-color: ${o};`}
                  @click=${() => this.selectDate(t.iso)}
                >
                  <span>${t.day}</span>
                  ${e.has(t.iso) ? d`<span class="dot" aria-hidden="true"></span>` : y}
                </button>
              </div>
            `;
    })}
        </div>
      `)}
    `;
  }
}
i([
  l({ type: Number })
], n.prototype, "year");
i([
  l({ type: Number })
], n.prototype, "month");
i([
  l({ type: String, attribute: "selected-date" })
], n.prototype, "selectedDate");
i([
  l({ type: String, attribute: "dot-dates" })
], n.prototype, "dotDates");
i([
  l({ type: String, attribute: "first-day-of-week" })
], n.prototype, "firstDayOfWeek");
i([
  k()
], n.prototype, "focusedDate");
export {
  n as VdsDateGrid
};
