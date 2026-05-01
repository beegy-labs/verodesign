import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vds-page-utilities')
export class VdsPageUtilities extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: var(--vds-font-size-2xl); margin: 0 0 var(--vds-spacing-4); }
    h2 { font-size: var(--vds-font-size-xl); margin: var(--vds-spacing-6) 0 var(--vds-spacing-3); }
    .row { padding: var(--vds-spacing-3); background: var(--vds-theme-bg-card); border: 1px solid var(--vds-theme-border-subtle); border-radius: var(--vds-radius-md); margin-bottom: var(--vds-spacing-2); }
    .row-label { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); margin-bottom: var(--vds-spacing-2); font-family: var(--vds-font-family-mono); }
    .swatch-line { display: flex; gap: var(--vds-spacing-2); flex-wrap: wrap; }
    .swatch-block { width: 60px; height: 60px; border-radius: var(--vds-radius-sm); display: flex; align-items: center; justify-content: center; font-size: 10px; color: white; text-shadow: 0 0 2px rgba(0,0,0,0.5); }
    .demo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: var(--vds-spacing-2); }
    .demo-box { padding: var(--vds-spacing-3); background: var(--vds-theme-bg-elevated); border-radius: var(--vds-radius-md); text-align: center; font-size: var(--vds-font-size-xs); }
    .ring-demo { display: inline-block; padding: var(--vds-spacing-2) var(--vds-spacing-4); margin: var(--vds-spacing-2); background: var(--vds-theme-bg-card); border-radius: var(--vds-radius-md); }
  `;

  protected createRenderRoot() {
    // Use light DOM so global utility classes apply
    return this;
  }

  render() {
    return html`
      <h1>Utilities</h1>
      <p>Token-driven utility classes — Tailwind-independent. All examples use <code>vds-*</code> classes from <code>@verobee/design/utilities/full.css</code>.</p>

      <h2>Color × Opacity (color-mix in oklab)</h2>
      <div class="row">
        <div class="row-label">vds-bg-primary &mdash; with /N opacity steps</div>
        <div class="swatch-line">
          ${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => html`
            <div class="swatch-block vds-bg-primary/${n}"><span>${n}</span></div>
          `)}
        </div>
      </div>
      <div class="row">
        <div class="row-label">vds-bg-success / vds-bg-warning / vds-bg-error / vds-bg-info — soft (15)</div>
        <div class="swatch-line">
          <div class="swatch-block vds-bg-success/15" style="color: var(--vds-theme-success)">success/15</div>
          <div class="swatch-block vds-bg-warning/15" style="color: var(--vds-theme-warning)">warning/15</div>
          <div class="swatch-block vds-bg-error/15" style="color: var(--vds-theme-error)">error/15</div>
          <div class="swatch-block vds-bg-info/15" style="color: var(--vds-theme-info)">info/15</div>
        </div>
      </div>

      <h2>Spacing</h2>
      <div class="row">
        <div class="row-label">vds-p-{step}</div>
        <div class="swatch-line">
          ${['1', '2', '3', '4', '6', '8'].map((s) => html`
            <div style="background: var(--vds-theme-bg-elevated); border-radius: var(--vds-radius-sm)" class="vds-p-${s}">
              <div style="background: var(--vds-theme-primary); width: 24px; height: 24px; border-radius: 2px;"></div>
            </div>
          `)}
        </div>
      </div>

      <h2>Typography</h2>
      <div class="row">
        <div class="row-label">vds-text-{xs..6xl}</div>
        ${['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map((s) => html`
          <div class="vds-text-${s}">${s} — The quick brown fox</div>
        `)}
      </div>

      <h2>Radius</h2>
      <div class="row">
        <div class="row-label">vds-rounded-{xs..full}</div>
        <div class="swatch-line">
          ${['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].map((r) => html`
            <div class="vds-rounded-${r}" style="background: var(--vds-theme-primary); width: 60px; height: 60px;"></div>
          `)}
        </div>
      </div>

      <h2>Shadow / Elevation</h2>
      <div class="row">
        <div class="demo-grid">
          ${['1', '2', '3', '4', '5', '6'].map((s) => html`
            <div class="demo-box vds-shadow-${s}">shadow-${s}</div>
          `)}
        </div>
      </div>

      <h2>Ring (focus / selection)</h2>
      <div class="row">
        <div class="ring-demo vds-ring-2 vds-ring-primary">ring-2 primary</div>
        <div class="ring-demo vds-ring-2 vds-ring-destructive">ring-2 destructive</div>
        <div class="ring-demo vds-ring-4 vds-ring-success vds-ring-offset-2">ring-4 success offset-2</div>
      </div>

      <h2>Animations</h2>
      <div class="row">
        <div class="swatch-line">
          <div class="vds-anim-spin" style="width: 32px; height: 32px; border: 3px solid var(--vds-theme-border-subtle); border-top-color: var(--vds-theme-primary); border-radius: 50%"></div>
          <div class="vds-anim-pulse" style="width: 60px; height: 32px; background: var(--vds-theme-bg-elevated); border-radius: var(--vds-radius-md)"></div>
          <div class="vds-anim-bounce" style="width: 32px; height: 32px; background: var(--vds-theme-primary); border-radius: 50%"></div>
        </div>
      </div>

      <h2>Transform</h2>
      <div class="row">
        <div class="swatch-line">
          ${[0, 45, 90, 180].map((r) => html`
            <div class="vds-rotate-${r}" style="width: 40px; height: 40px; background: var(--vds-theme-accent); border-radius: var(--vds-radius-sm); display: flex; align-items: center; justify-content: center; color: white">${r}°</div>
          `)}
        </div>
      </div>

      <h2>Backdrop blur</h2>
      <div class="row" style="background: linear-gradient(135deg, var(--vds-theme-primary), var(--vds-theme-accent)); padding: var(--vds-spacing-8)">
        <div class="swatch-line">
          ${['none', 'sm', 'md', 'lg', 'xl'].map((b) => html`
            <div class="vds-backdrop-blur-${b}" style="background: rgba(255,255,255,0.1); padding: var(--vds-spacing-3); border-radius: var(--vds-radius-md); color: white; font-size: var(--vds-font-size-xs)">blur-${b}</div>
          `)}
        </div>
      </div>

      <h2>Group hover (consumer light DOM)</h2>
      <div class="row">
        <div class="vds-group" style="display: inline-block; padding: var(--vds-spacing-4); background: var(--vds-theme-bg-elevated); border-radius: var(--vds-radius-md); cursor: pointer">
          Hover me &rarr;
          <span class="vds-group-hover:text-primary" style="display: block; margin-top: 8px; font-size: var(--vds-font-size-sm); color: var(--vds-theme-text-dim)">child reveals primary color on parent hover</span>
        </div>
      </div>
    `;
  }
}
