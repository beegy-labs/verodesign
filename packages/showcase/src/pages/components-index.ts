import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const COMPONENTS = [
  { name: 'badge', purpose: 'Inline status / count indicator' },
  { name: 'button', purpose: 'Action trigger (form-associated)' },
  { name: 'card', purpose: 'Content container with optional header/footer' },
  { name: 'checkbox', purpose: 'Tri-state checkbox (form-associated)' },
  { name: 'dialog', purpose: 'Modal dialog with focus trap' },
  { name: 'label', purpose: 'Form field label (label/for binding)' },
  { name: 'menu', purpose: 'Action menu / dropdown' },
  { name: 'select', purpose: 'Combobox (select-only)' },
  { name: 'separator', purpose: 'Visual section divider' },
  { name: 'switch', purpose: 'Toggle switch (form-associated)' },
  { name: 'table', purpose: 'Semantic table wrapper' },
  { name: 'tabs', purpose: 'Tab navigation' },
  { name: 'text-area', purpose: 'Multi-line text input' },
  { name: 'text-field', purpose: 'Single-line text input' },
  { name: 'toast', purpose: 'Transient notification' },
  { name: 'tooltip', purpose: 'Descriptive hover/focus tip' },
];

@customElement('vds-page-components-index')
export class VdsPageComponentsIndex extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: var(--vds-font-size-2xl); margin: 0 0 var(--vds-spacing-4); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--vds-spacing-3); }
    a {
      display: block;
      padding: var(--vds-spacing-3);
      background: var(--vds-theme-bg-card);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-md);
      transition: border-color 150ms, transform 150ms;
    }
    a:hover { border-color: var(--vds-theme-primary); transform: translateY(-2px); }
    .name { font-family: var(--vds-font-family-mono); font-size: var(--vds-font-size-sm); color: var(--vds-theme-primary); }
    .purpose { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); margin-top: 4px; }
  `;

  render() {
    return html`
      <h1>Components (16)</h1>
      <p>WAI-ARIA AP 1.2 patterns. Lit 3 web components. Framework-agnostic + React adapter.</p>
      <div class="grid">
        ${COMPONENTS.map((c) => html`
          <a href="#/components/${c.name}">
            <div class="name">&lt;vds-${c.name}&gt;</div>
            <div class="purpose">${c.purpose}</div>
          </a>
        `)}
      </div>
    `;
  }
}
