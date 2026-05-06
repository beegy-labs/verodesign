import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('vds-page-home')
export class VdsPageHome extends LitElement {
  static styles = css`
    :host { display: block; }

    /* ── Hero ─────────────────────────────────────────────────── */
    .hero {
      padding: var(--vds-spacing-8) 0 var(--vds-spacing-10);
      border-bottom: 1px solid var(--vds-theme-border-subtle);
      margin-bottom: var(--vds-spacing-8);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      font-size: var(--vds-font-size-xs);
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--vds-theme-primary);
      background: color-mix(in oklab, var(--vds-theme-primary) 10%, transparent);
      padding: 4px 12px;
      border-radius: var(--vds-radius-full);
      margin-bottom: var(--vds-spacing-4);
    }
    .eyebrow::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--vds-theme-primary);
    }

    h1 {
      font-size: clamp(var(--vds-font-size-3xl), 5vw, var(--vds-font-size-5xl));
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin: 0 0 var(--vds-spacing-4);
      background: linear-gradient(135deg,
        var(--vds-theme-logo-start) 0%,
        var(--vds-theme-logo-end) 60%,
        var(--vds-theme-accent) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .lead {
      font-size: var(--vds-font-size-lg);
      color: var(--vds-theme-text-secondary);
      max-width: 560px;
      line-height: 1.6;
      margin: 0 0 var(--vds-spacing-6);
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--vds-spacing-2);
    }

    .badge {
      font-size: var(--vds-font-size-xs);
      padding: 4px 10px;
      border-radius: var(--vds-radius-full);
      border: 1px solid var(--vds-theme-border-default);
      color: var(--vds-theme-text-dim);
      background: var(--vds-theme-bg-elevated);
    }

    /* ── Stats ───────────────────────────────────────────────── */
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--vds-spacing-3);
      margin-bottom: var(--vds-spacing-8);
    }

    .stat {
      padding: var(--vds-spacing-4);
      background: var(--vds-theme-bg-card);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-lg);
      position: relative;
      overflow: hidden;
    }
    .stat::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--vds-theme-primary), var(--vds-theme-accent));
    }
    .stat-num {
      font-size: var(--vds-font-size-3xl);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--vds-theme-text-primary);
      line-height: 1;
      margin-bottom: var(--vds-spacing-1);
    }
    .stat-label {
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-dim);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── Feature cards ───────────────────────────────────────── */
    .section-title {
      font-size: var(--vds-font-size-xs);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--vds-theme-text-faint);
      margin-bottom: var(--vds-spacing-3);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--vds-spacing-3);
      margin-bottom: var(--vds-spacing-8);
    }

    .card {
      display: block;
      padding: var(--vds-spacing-5);
      background: var(--vds-theme-bg-card);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-lg);
      text-decoration: none;
      transition: border-color 0.15s, background 0.15s, transform 0.15s;
    }
    .card:hover {
      border-color: var(--vds-theme-primary);
      background: color-mix(in oklab, var(--vds-theme-primary) 4%, var(--vds-theme-bg-card));
      transform: translateY(-2px);
      text-decoration: none;
    }

    .card-icon {
      font-size: 24px;
      margin-bottom: var(--vds-spacing-3);
      display: block;
    }

    .card h3 {
      margin: 0 0 var(--vds-spacing-2);
      font-size: var(--vds-font-size-base);
      font-weight: 600;
      color: var(--vds-theme-text-primary);
    }
    .card p {
      margin: 0;
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-dim);
      line-height: 1.5;
    }

    /* ── Palette preview ─────────────────────────────────────── */
    .palette {
      display: flex;
      gap: 0;
      border-radius: var(--vds-radius-lg);
      overflow: hidden;
      height: 48px;
      border: 1px solid var(--vds-theme-border-subtle);
      margin-bottom: var(--vds-spacing-6);
    }
    .palette-swatch { flex: 1; }

    /* ── Code snippet ────────────────────────────────────────── */
    .install {
      background: var(--vds-theme-bg-code);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-lg);
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-4);
    }
    .install code {
      font-family: var(--vds-font-family-mono);
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-primary);
      background: transparent;
      padding: 0;
    }
    .install-label {
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-faint);
      white-space: nowrap;
    }

    @media (max-width: 600px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
    }
  `;

  render() {
    const palette = [
      'var(--vds-theme-primary)',
      'color-mix(in oklab, var(--vds-theme-primary) 70%, var(--vds-theme-accent))',
      'color-mix(in oklab, var(--vds-theme-accent) 70%, var(--vds-theme-primary))',
      'var(--vds-theme-accent)',
      'color-mix(in oklab, var(--vds-theme-accent) 60%, transparent)',
    ];

    return html`
      <div class="hero">
        <div class="eyebrow">Verobee Design System</div>
        <h1>Token-driven UI<br>without the overhead</h1>
        <p class="lead">
          OKLCH-first color system. W3C DTCG 3-tier tokens.
          Four themes, two modes, zero framework lock-in.
        </p>
        <div class="hero-badges">
          <span class="badge">OKLCH color space</span>
          <span class="badge">WCAG AA compliant</span>
          <span class="badge">Tailwind-independent</span>
          <span class="badge">Lit 3 web components</span>
          <span class="badge">CSS-only core</span>
        </div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-num">4</div>
          <div class="stat-label">themes</div>
        </div>
        <div class="stat">
          <div class="stat-num">321</div>
          <div class="stat-label">tokens</div>
        </div>
        <div class="stat">
          <div class="stat-num">2.7k+</div>
          <div class="stat-label">utility classes</div>
        </div>
        <div class="stat">
          <div class="stat-num">16</div>
          <div class="stat-label">components</div>
        </div>
      </div>

      <p class="section-title">Active palette</p>
      <div class="palette">
        ${palette.map((c) => html`
          <div class="palette-swatch" style="background: ${c}"></div>
        `)}
      </div>

      <p class="section-title">Explore</p>
      <div class="cards">
        <a class="card" href="#/tokens">
          <span class="card-icon">◈</span>
          <h3>Tokens</h3>
          <p>Primitive → semantic → component. Theme as an orthogonal binding layer over OKLCH primitives.</p>
        </a>
        <a class="card" href="#/utilities">
          <span class="card-icon">⊞</span>
          <h3>Utilities</h3>
          <p>2,700+ utility classes. Color, spacing, typography, layout — all token-driven.</p>
        </a>
        <a class="card" href="#/components">
          <span class="card-icon">⬕</span>
          <h3>Components</h3>
          <p>Lit 3 web components, WAI-ARIA 1.2, @lit/react adapter. Fully theme-aware.</p>
        </a>
      </div>

      <p class="section-title">Quick start</p>
      <div class="install">
        <code>pnpm add @verobee/design</code>
        <span class="install-label">npm / yarn also supported</span>
      </div>
    `;
  }
}
