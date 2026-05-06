import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const NAV = [
  { path: '#/', label: 'Overview', icon: '⬡' },
  { path: '#/tokens', label: 'Tokens', icon: '◈' },
  { path: '#/utilities', label: 'Utilities', icon: '⊞' },
  { path: '#/components', label: 'Components', icon: '⬕' },
];

const COMPONENT_LIST = [
  'badge', 'button', 'card', 'checkbox', 'dialog', 'label',
  'menu', 'select', 'separator', 'switch', 'table', 'tabs',
  'text-area', 'text-field', 'toast', 'tooltip',
];

@customElement('vds-app')
export class VdsApp extends LitElement {
  static styles = css`
    :host { display: block; min-height: 100vh; }

    /* ── Header ───────────────────────────────────────────────── */
    header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--vds-spacing-6);
      height: 56px;
      background: color-mix(in oklab, var(--vds-theme-bg-page) 88%, transparent);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--vds-theme-border-subtle);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
      text-decoration: none;
    }

    .brand-hex {
      width: 30px;
      height: 30px;
      flex-shrink: 0;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .brand-name {
      font-size: var(--vds-font-size-sm);
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(120deg, var(--vds-theme-logo-start), var(--vds-theme-logo-end));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .brand-tag {
      font-size: 10px;
      color: var(--vds-theme-text-faint);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      line-height: 1;
    }

    /* ── Layout ───────────────────────────────────────────────── */
    .layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      min-height: calc(100vh - 56px);
    }

    /* ── Sidebar ─────────────────────────────────────────────── */
    aside {
      position: sticky;
      top: 56px;
      height: calc(100vh - 56px);
      overflow-y: auto;
      padding: var(--vds-spacing-4) var(--vds-spacing-3);
      border-right: 1px solid var(--vds-theme-border-subtle);
      scrollbar-width: none;
    }
    aside::-webkit-scrollbar { display: none; }

    nav { display: flex; flex-direction: column; gap: 2px; }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      padding: var(--vds-spacing-2) var(--vds-spacing-3);
      border-radius: var(--vds-radius-md);
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-font-size-sm);
      text-decoration: none;
      transition: background 0.12s, color 0.12s;
    }
    .nav-item:hover { background: var(--vds-theme-bg-hover); color: var(--vds-theme-text-primary); text-decoration: none; }
    .nav-item.active {
      background: color-mix(in oklab, var(--vds-theme-primary) 12%, transparent);
      color: var(--vds-theme-primary);
      font-weight: 600;
    }
    .nav-icon {
      font-size: 14px;
      opacity: 0.7;
      width: 16px;
      text-align: center;
      flex-shrink: 0;
    }
    .nav-item.active .nav-icon { opacity: 1; }

    .nav-section {
      margin-top: var(--vds-spacing-4);
      margin-bottom: var(--vds-spacing-1);
      padding: 0 var(--vds-spacing-3);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--vds-theme-text-faint);
      font-weight: 600;
    }

    .nav-sub {
      font-size: var(--vds-font-size-xs);
      padding: 5px var(--vds-spacing-3) 5px calc(var(--vds-spacing-3) + 24px);
    }

    /* ── Content ─────────────────────────────────────────────── */
    article {
      padding: var(--vds-spacing-8) var(--vds-spacing-8);
      min-width: 0;
      max-width: 960px;
    }

    /* ── Mobile ─────────────────────────────────────────────── */
    @media (max-width: 768px) {
      .layout { grid-template-columns: 1fr; }
      aside { position: static; height: auto; border-right: none; border-bottom: 1px solid var(--vds-theme-border-subtle); }
      nav { flex-direction: row; flex-wrap: wrap; }
      .nav-section { display: none; }
      .nav-sub { display: none; }
      article { padding: var(--vds-spacing-5) var(--vds-spacing-4); }
    }
  `;

  @state() private route = window.location.hash || '#/';

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.handleHashChange);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  private handleHashChange = () => {
    this.route = window.location.hash || '#/';
  };

  private renderPage() {
    const r = this.route;
    if (r === '#/' || r === '') return html`<vds-page-home></vds-page-home>`;
    if (r === '#/tokens') return html`<vds-page-tokens></vds-page-tokens>`;
    if (r === '#/utilities') return html`<vds-page-utilities></vds-page-utilities>`;
    if (r === '#/components') return html`<vds-page-components-index></vds-page-components-index>`;
    if (r.startsWith('#/components/')) {
      const name = r.replace('#/components/', '');
      return html`<vds-page-component name=${name}></vds-page-component>`;
    }
    return html`<p>Not found: ${r}</p>`;
  }

  render() {
    const isActive = (path: string) =>
      this.route === path || (path === '#/components' && this.route.startsWith('#/components'));

    return html`
      <header>
        <a class="brand" href="#/">
          <svg class="brand-hex" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16,2 28,9 28,23 16,30 4,23 4,9"
              fill="color-mix(in oklab, var(--vds-theme-primary) 15%, transparent)"
              stroke="var(--vds-theme-primary)" stroke-width="1.5"/>
            <polygon points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5"
              fill="color-mix(in oklab, var(--vds-theme-accent) 25%, transparent)"
              stroke="var(--vds-theme-accent)" stroke-width="1"/>
            <circle cx="16" cy="15" r="2.5" fill="var(--vds-theme-primary)"/>
          </svg>
          <div class="brand-text">
            <span class="brand-name">Verobee Design</span>
            <span class="brand-tag">v0.1.0</span>
          </div>
        </a>
        <vds-theme-switcher></vds-theme-switcher>
      </header>

      <div class="layout">
        <aside>
          <nav>
            ${NAV.map((item) => html`
              <a href=${item.path} class="nav-item ${isActive(item.path) ? 'active' : ''}">
                <span class="nav-icon">${item.icon}</span>
                ${item.label}
              </a>
            `)}
            <div class="nav-section">Components</div>
            ${COMPONENT_LIST.map((c) => html`
              <a href="#/components/${c}"
                class="nav-item nav-sub ${this.route === `#/components/${c}` ? 'active' : ''}">
                ${c}
              </a>
            `)}
          </nav>
        </aside>
        <article>${this.renderPage()}</article>
      </div>
    `;
  }
}
