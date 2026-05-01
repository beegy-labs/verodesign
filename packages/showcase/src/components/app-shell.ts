import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

const ROUTES = [
  { path: '#/', label: 'Overview' },
  { path: '#/tokens', label: 'Tokens' },
  { path: '#/utilities', label: 'Utilities' },
  { path: '#/components', label: 'Components' },
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

    header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--vds-spacing-4) var(--vds-spacing-6);
      background: color-mix(in oklab, var(--vds-theme-bg-card) 85%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--vds-theme-border-subtle);
    }
    .brand {
      display: flex;
      align-items: baseline;
      gap: var(--vds-spacing-3);
    }
    .brand strong {
      font-size: var(--vds-font-size-lg);
      background: linear-gradient(135deg, var(--vds-theme-logo-start), var(--vds-theme-logo-end));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .brand small { color: var(--vds-theme-text-dim); font-size: var(--vds-font-size-xs); }

    main {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: var(--vds-spacing-6);
      padding: var(--vds-spacing-6);
      max-width: 1280px;
      margin: 0 auto;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    nav a {
      padding: var(--vds-spacing-2) var(--vds-spacing-3);
      border-radius: var(--vds-radius-md);
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-font-size-sm);
    }
    nav a.active { background: var(--vds-theme-bg-hover); color: var(--vds-theme-primary); font-weight: 600; }
    nav .section-title {
      margin-top: var(--vds-spacing-4);
      padding: 0 var(--vds-spacing-3);
      font-size: var(--vds-font-size-xs);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--vds-theme-text-faint);
    }

    article {
      min-width: 0;
    }

    @media (max-width: 768px) {
      main { grid-template-columns: 1fr; }
      nav { flex-direction: row; flex-wrap: wrap; }
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
    return html`
      <header>
        <div class="brand">
          <strong>VDS</strong>
          <small>Verobee Design System · v0.0.1</small>
        </div>
        <vds-theme-switcher></vds-theme-switcher>
      </header>
      <main>
        <nav>
          ${ROUTES.map((r) => html`<a href=${r.path} class=${this.route === r.path || (r.path === '#/components' && this.route.startsWith('#/components')) ? 'active' : ''}>${r.label}</a>`)}
          <div class="section-title">Components</div>
          ${COMPONENT_LIST.map((c) => html`<a href="#/components/${c}" class=${this.route === `#/components/${c}` ? 'active' : ''}>${c}</a>`)}
        </nav>
        <article>${this.renderPage()}</article>
      </main>
    `;
  }
}
