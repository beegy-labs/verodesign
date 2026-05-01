import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vds-page-home')
export class VdsPageHome extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 {
      font-size: var(--vds-font-size-3xl);
      font-weight: var(--vds-font-weight-700);
      margin: 0 0 var(--vds-spacing-2);
      background: linear-gradient(135deg, var(--vds-theme-logo-start), var(--vds-theme-logo-end));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .lead { color: var(--vds-theme-text-secondary); font-size: var(--vds-font-size-lg); margin: 0 0 var(--vds-spacing-6); }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--vds-spacing-4); }
    .card {
      padding: var(--vds-spacing-4);
      background: var(--vds-theme-bg-card);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-lg);
    }
    .card h3 { margin: 0 0 var(--vds-spacing-2); font-size: var(--vds-font-size-base); }
    .card p { margin: 0; color: var(--vds-theme-text-dim); font-size: var(--vds-font-size-sm); }
    .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--vds-spacing-3); margin: var(--vds-spacing-6) 0; }
    .stat { padding: var(--vds-spacing-3); background: var(--vds-theme-bg-elevated); border-radius: var(--vds-radius-md); text-align: center; }
    .stat .num { font-size: var(--vds-font-size-2xl); font-weight: var(--vds-font-weight-700); color: var(--vds-theme-primary); }
    .stat .label { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); }
  `;

  render() {
    return html`
      <h1>Verobee Design System</h1>
      <p class="lead">Token-driven CSS architecture. OKLCH-first. Tailwind-independent.</p>

      <div class="stat-grid">
        <div class="stat"><div class="num">3</div><div class="label">themes</div></div>
        <div class="stat"><div class="num">2</div><div class="label">modes (light/dark)</div></div>
        <div class="stat"><div class="num">16</div><div class="label">components</div></div>
        <div class="stat"><div class="num">2,700+</div><div class="label">utility classes</div></div>
      </div>

      <div class="cards">
        <a class="card" href="#/tokens">
          <h3>Tokens</h3>
          <p>3-tier W3C DTCG: primitive · semantic · component-deferred. Theme as orthogonal binding layer.</p>
        </a>
        <a class="card" href="#/utilities">
          <h3>Utilities</h3>
          <p>Tailwind-independent utility classes. Color · spacing · typography · layout · transform · ring · animations.</p>
        </a>
        <a class="card" href="#/components">
          <h3>Components</h3>
          <p>Lit 3 web components, WAI-ARIA AP 1.2, framework-agnostic. React adapter via @lit/react.</p>
        </a>
      </div>
    `;
  }
}
