import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const THEMES = ['default', 'veronex', 'verobase'] as const;
const MODES = ['light', 'dark'] as const;

@customElement('vds-theme-switcher')
export class VdsThemeSwitcher extends LitElement {
  static styles = css`
    :host { display: inline-flex; gap: var(--vds-spacing-2); align-items: center; }
    select {
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-sm);
      padding: 4px 8px;
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border: 1px solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-md);
    }
    label { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); }
  `;

  @state() private theme = (localStorage.getItem('vds:theme') ?? 'default');
  @state() private mode = (localStorage.getItem('vds:mode') ?? 'light');

  connectedCallback(): void {
    super.connectedCallback();
    document.documentElement.setAttribute('data-theme', this.theme);
    document.documentElement.setAttribute('data-mode', this.mode);
  }

  private setTheme = (e: Event) => {
    this.theme = (e.target as HTMLSelectElement).value;
    localStorage.setItem('vds:theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
  };
  private setMode = (e: Event) => {
    this.mode = (e.target as HTMLSelectElement).value;
    localStorage.setItem('vds:mode', this.mode);
    document.documentElement.setAttribute('data-mode', this.mode);
  };

  render() {
    return html`
      <label>theme
        <select .value=${this.theme} @change=${this.setTheme}>
          ${THEMES.map((t) => html`<option value=${t} ?selected=${t === this.theme}>${t}</option>`)}
        </select>
      </label>
      <label>mode
        <select .value=${this.mode} @change=${this.setMode}>
          ${MODES.map((m) => html`<option value=${m} ?selected=${m === this.mode}>${m}</option>`)}
        </select>
      </label>
    `;
  }
}
