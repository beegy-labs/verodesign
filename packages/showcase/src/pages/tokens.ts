import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const COLOR_SLOTS = [
  ['Surface', ['bg-page', 'bg-card', 'bg-elevated', 'bg-hover', 'bg-muted', 'bg-inverse', 'bg-code']],
  ['Text', ['text-primary', 'text-secondary', 'text-bright', 'text-dim', 'text-faint', 'text-inverse']],
  ['Border', ['border-subtle', 'border-default', 'border-strong', 'border-focus']],
  ['Brand', ['primary', 'primary-fg', 'primary-ring', 'accent', 'accent-fg', 'accent-2', 'accent-2-fg', 'accent-3', 'accent-3-fg']],
  ['Status', ['success', 'success-fg', 'success-bg', 'warning', 'warning-fg', 'warning-bg', 'error', 'error-fg', 'error-bg', 'info', 'info-fg', 'info-bg', 'destructive', 'destructive-fg']],
  ['Neutral', ['neutral', 'neutral-fg', 'neutral-bg', 'cancelled', 'cancelled-fg']],
  ['Chart', ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5']],
  ['Logo', ['logo-start', 'logo-end', 'logo-inner']],
];

const SPACING = ['0', '0_5', '1', '1_5', '2', '2_5', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'];
const TYPO_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
const RADIUS = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
const SHADOWS = ['1', '2', '3', '4', '5', '6'];

@customElement('vds-page-tokens')
export class VdsPageTokens extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: var(--vds-font-size-2xl); margin: 0 0 var(--vds-spacing-4); }
    h2 { font-size: var(--vds-font-size-xl); margin: var(--vds-spacing-6) 0 var(--vds-spacing-3); }
    h3 { font-size: var(--vds-font-size-base); margin: var(--vds-spacing-4) 0 var(--vds-spacing-2); color: var(--vds-theme-text-secondary); }
    .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--vds-spacing-2); }
    .swatch {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0;
      border-radius: var(--vds-radius-md);
      overflow: hidden;
      border: 1px solid var(--vds-theme-border-subtle);
      background: var(--vds-theme-bg-card);
    }
    .swatch .color { height: 60px; }
    .swatch .meta { padding: 6px 10px; font-size: var(--vds-font-size-xs); }
    .swatch code { font-family: var(--vds-font-family-mono); color: var(--vds-theme-text-dim); }

    .scale { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: var(--vds-spacing-2); }
    .scale-item {
      padding: var(--vds-spacing-2);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-md);
      background: var(--vds-theme-bg-card);
      text-align: center;
      font-size: var(--vds-font-size-xs);
    }
    .scale-item .demo { background: var(--vds-theme-primary); border-radius: var(--vds-radius-sm); }
    .typo-scale { display: flex; flex-direction: column; gap: var(--vds-spacing-2); }
    .typo-row { display: flex; align-items: baseline; gap: var(--vds-spacing-3); padding: var(--vds-spacing-2); background: var(--vds-theme-bg-card); border-radius: var(--vds-radius-md); border: 1px solid var(--vds-theme-border-subtle); }
    .typo-row code { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); width: 60px; flex-shrink: 0; }

    .shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--vds-spacing-3); }
    .shadow-item { padding: var(--vds-spacing-4); background: var(--vds-theme-bg-card); border-radius: var(--vds-radius-md); text-align: center; font-size: var(--vds-font-size-xs); }
  `;

  render() {
    return html`
      <h1>Design Tokens</h1>
      <p>Switch theme/mode in the header. All colors below re-render automatically (CSS variable cascade).</p>

      <h2>Colors</h2>
      ${COLOR_SLOTS.map(([title, slots]) => html`
        <h3>${title}</h3>
        <div class="swatch-grid">
          ${(slots as string[]).map((slot) => html`
            <div class="swatch">
              <div class="color" style="background: var(--vds-theme-${slot})"></div>
              <div class="meta">
                <div>${slot}</div>
                <code>--vds-theme-${slot}</code>
              </div>
            </div>
          `)}
        </div>
      `)}

      <h2>Spacing</h2>
      <div class="scale">
        ${SPACING.map((s) => html`
          <div class="scale-item">
            <div class="demo" style="height: 8px; width: var(--vds-spacing-${s})"></div>
            <code>${s.replace('_', '.')}</code>
          </div>
        `)}
      </div>

      <h2>Typography</h2>
      <div class="typo-scale">
        ${TYPO_SIZES.map((s) => html`
          <div class="typo-row">
            <code>${s}</code>
            <span style="font-size: var(--vds-font-size-${s})">The quick brown fox jumps over the lazy dog</span>
          </div>
        `)}
      </div>

      <h2>Radius</h2>
      <div class="scale">
        ${RADIUS.map((r) => html`
          <div class="scale-item">
            <div class="demo" style="height: 40px; border-radius: var(--vds-radius-${r})"></div>
            <code>${r}</code>
          </div>
        `)}
      </div>

      <h2>Shadow / Elevation</h2>
      <div class="shadow-grid">
        ${SHADOWS.map((s) => html`
          <div class="shadow-item" style="box-shadow: var(--vds-shadow-${s})">
            <code>shadow-${s}</code>
          </div>
        `)}
      </div>
    `;
  }
}
