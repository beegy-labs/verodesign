import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const THEMES = ['default', 'veronex', 'verobase', 'verobase-admin'] as const;
const MODES = ['light', 'dark'] as const;

@customElement('vds-theme-switcher')
export class VdsThemeSwitcher extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-3);
    }

    .group {
      display: inline-flex;
      border: 1px solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-lg);
      overflow: hidden;
      background: var(--vds-theme-bg-elevated);
    }

    button {
      cursor: pointer;
      border: none;
      background: transparent;
      padding: 5px 12px;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-dim);
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
    }
    button:not(:last-child) {
      border-right: 1px solid var(--vds-theme-border-subtle);
    }
    button.active {
      background: var(--vds-theme-primary);
      color: var(--vds-theme-primary-fg);
      font-weight: 600;
    }
    button:hover:not(.active) {
      background: var(--vds-theme-bg-hover);
      color: var(--vds-theme-text-primary);
    }

    .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      vertical-align: middle;
    }

    .mode-btn {
      padding: 5px 10px;
      font-size: var(--vds-font-size-sm);
    }
  `;

  @state() private theme = (localStorage.getItem('vds:theme') ?? 'default');
  @state() private mode = (localStorage.getItem('vds:mode') ?? 'dark');

  connectedCallback(): void {
    super.connectedCallback();
    document.documentElement.setAttribute('data-theme', this.theme);
    document.documentElement.setAttribute('data-mode', this.mode);
  }

  private setTheme(t: string) {
    this.theme = t;
    localStorage.setItem('vds:theme', t);
    document.documentElement.setAttribute('data-theme', t);
  }

  private toggleMode() {
    const next = this.mode === 'dark' ? 'light' : 'dark';
    this.mode = next;
    localStorage.setItem('vds:mode', next);
    document.documentElement.setAttribute('data-mode', next);
  }

  private themeLabel(t: string) {
    const labels: Record<string, string> = {
      default: 'Default',
      veronex: 'Veronex',
      verobase: 'Solution',
      'verobase-admin': 'Admin',
    };
    return labels[t] ?? t;
  }

  render() {
    return html`
      <div class="group">
        ${THEMES.map((t) => html`
          <button
            class=${t === this.theme ? 'active' : ''}
            @click=${() => this.setTheme(t)}
          >${this.themeLabel(t)}</button>
        `)}
      </div>
      <div class="group">
        <button class="mode-btn" @click=${this.toggleMode}>
          ${this.mode === 'dark' ? '☀︎' : '☾'}
        </button>
      </div>
    `;
  }
}
