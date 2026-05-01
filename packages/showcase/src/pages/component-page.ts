import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('vds-page-component')
export class VdsPageComponent extends LitElement {
  static styles = css`
    :host { display: block; }
    h1 { font-size: var(--vds-font-size-2xl); margin: 0 0 var(--vds-spacing-1); font-family: var(--vds-font-family-mono); }
    h1 small { font-size: var(--vds-font-size-sm); color: var(--vds-theme-text-dim); font-family: var(--vds-font-family-sans); margin-left: var(--vds-spacing-2); }
    h2 { font-size: var(--vds-font-size-xl); margin: var(--vds-spacing-6) 0 var(--vds-spacing-3); }
    .demo {
      padding: var(--vds-spacing-6);
      background: var(--vds-theme-bg-card);
      border: 1px solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-md);
      margin-bottom: var(--vds-spacing-3);
      display: flex;
      flex-wrap: wrap;
      gap: var(--vds-spacing-3);
      align-items: center;
      min-height: 120px;
    }
    .label { font-size: var(--vds-font-size-xs); color: var(--vds-theme-text-dim); margin-bottom: var(--vds-spacing-2); font-family: var(--vds-font-family-mono); }
    .group { width: 100%; }
    .row { display: flex; gap: var(--vds-spacing-3); flex-wrap: wrap; align-items: center; }
    pre { background: var(--vds-theme-bg-code); padding: var(--vds-spacing-3); border-radius: var(--vds-radius-md); font-size: var(--vds-font-size-xs); overflow-x: auto; }
  `;

  @property({ type: String }) name = '';

  protected createRenderRoot() {
    return this;
  }

  render() {
    const renderer = (RENDERERS as Record<string, () => unknown>)[this.name];
    return html`
      <h1>&lt;vds-${this.name}&gt; <small>component</small></h1>
      ${renderer ? renderer() : html`<p>No demo for ${this.name} yet.</p>`}
    `;
  }
}

const RENDERERS = {
  badge: () => html`
    <h2>Tones × Variants</h2>
    <div class="demo">
      <div class="group">
        <div class="label">solid</div>
        <div class="row">
          <vds-badge variant="solid" tone="primary">Primary</vds-badge>
          <vds-badge variant="solid" tone="accent">Accent</vds-badge>
          <vds-badge variant="solid" tone="success">Success</vds-badge>
          <vds-badge variant="solid" tone="warning">Warning</vds-badge>
          <vds-badge variant="solid" tone="destructive">Destructive</vds-badge>
          <vds-badge variant="solid" tone="info">Info</vds-badge>
          <vds-badge variant="solid" tone="neutral">Neutral</vds-badge>
        </div>
      </div>
      <div class="group">
        <div class="label">soft</div>
        <div class="row">
          <vds-badge variant="soft" tone="primary">Primary</vds-badge>
          <vds-badge variant="soft" tone="accent">Accent</vds-badge>
          <vds-badge variant="soft" tone="success">Success</vds-badge>
          <vds-badge variant="soft" tone="warning">Warning</vds-badge>
          <vds-badge variant="soft" tone="destructive">Destructive</vds-badge>
          <vds-badge variant="soft" tone="info">Info</vds-badge>
        </div>
      </div>
      <div class="group">
        <div class="label">outline</div>
        <div class="row">
          <vds-badge variant="outline" tone="primary">Primary</vds-badge>
          <vds-badge variant="outline" tone="accent">Accent</vds-badge>
          <vds-badge variant="outline" tone="success">Success</vds-badge>
          <vds-badge variant="outline" tone="destructive">Destructive</vds-badge>
        </div>
      </div>
      <div class="group">
        <div class="label">sizes</div>
        <div class="row">
          <vds-badge size="sm" tone="primary">small</vds-badge>
          <vds-badge size="md" tone="primary">medium</vds-badge>
        </div>
      </div>
    </div>
  `,
  button: () => html`
    <h2>Variants × Tones</h2>
    <div class="demo">
      <div class="group">
        <div class="label">solid</div>
        <div class="row">
          <vds-button tone="primary">Primary</vds-button>
          <vds-button tone="accent">Accent</vds-button>
          <vds-button tone="destructive">Destructive</vds-button>
          <vds-button tone="neutral">Neutral</vds-button>
        </div>
      </div>
      <div class="group">
        <div class="label">soft / outline / ghost</div>
        <div class="row">
          <vds-button variant="soft" tone="primary">Soft</vds-button>
          <vds-button variant="outline" tone="primary">Outline</vds-button>
          <vds-button variant="ghost" tone="primary">Ghost</vds-button>
        </div>
      </div>
      <div class="group">
        <div class="label">sizes / states</div>
        <div class="row">
          <vds-button size="sm">Small</vds-button>
          <vds-button size="md">Medium</vds-button>
          <vds-button size="lg">Large</vds-button>
          <vds-button disabled>Disabled</vds-button>
          <vds-button loading>Loading</vds-button>
        </div>
      </div>
    </div>
  `,
  card: () => html`
    <div class="demo" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
      <vds-card>
        <h3 slot="header">Card title</h3>
        <p>Card body content. Theme tokens drive surface and border.</p>
        <div slot="footer">Footer area</div>
      </vds-card>
      <vds-card>
        <p>Plain card without header/footer.</p>
      </vds-card>
    </div>
  `,
  checkbox: () => html`
    <div class="demo">
      <div class="group">
        <div class="label">states</div>
        <div class="row">
          <vds-checkbox>Unchecked</vds-checkbox>
          <vds-checkbox checked>Checked</vds-checkbox>
          <vds-checkbox indeterminate>Indeterminate</vds-checkbox>
          <vds-checkbox disabled>Disabled</vds-checkbox>
          <vds-checkbox checked disabled>Checked + disabled</vds-checkbox>
        </div>
      </div>
      <div class="group">
        <div class="label">sizes</div>
        <div class="row">
          <vds-checkbox size="sm">Small</vds-checkbox>
          <vds-checkbox size="md">Medium</vds-checkbox>
          <vds-checkbox size="lg">Large</vds-checkbox>
        </div>
      </div>
    </div>
  `,
  dialog: () => html`
    <div class="demo">
      <vds-button id="open-dialog" onclick="document.querySelector('#demo-dialog').open=true">Open dialog</vds-button>
      <vds-dialog id="demo-dialog">
        <h3 slot="header">Dialog</h3>
        <p>Modal dialog with focus trap. Escape closes.</p>
        <div slot="footer">
          <vds-button variant="outline" onclick="this.closest('vds-dialog').open=false">Cancel</vds-button>
          <vds-button onclick="this.closest('vds-dialog').open=false">Confirm</vds-button>
        </div>
      </vds-dialog>
    </div>
  `,
  label: () => html`
    <div class="demo">
      <div class="row">
        <vds-label for="email">Email</vds-label>
        <vds-text-field id="email" type="email" placeholder="you@example.com"></vds-text-field>
      </div>
      <div class="row">
        <vds-label for="pwd" required>Password</vds-label>
        <vds-text-field id="pwd" type="password"></vds-text-field>
      </div>
    </div>
  `,
  menu: () => html`
    <div class="demo">
      <vds-menu>
        <vds-button slot="trigger">Open menu</vds-button>
        <vds-menu-item>Profile</vds-menu-item>
        <vds-menu-item>Settings</vds-menu-item>
        <vds-menu-item disabled>Logout (disabled)</vds-menu-item>
      </vds-menu>
    </div>
  `,
  select: () => html`
    <div class="demo">
      <vds-select placeholder="Choose a theme" name="theme" style="min-width: 240px">
        <vds-option value="default">Default</vds-option>
        <vds-option value="veronex">Veronex</vds-option>
        <vds-option value="verobase">Verobase</vds-option>
      </vds-select>
      <vds-select disabled placeholder="Disabled" style="min-width: 240px"></vds-select>
    </div>
  `,
  separator: () => html`
    <div class="demo" style="flex-direction: column; align-items: stretch">
      <p>Above separator</p>
      <vds-separator></vds-separator>
      <p>Between</p>
      <vds-separator></vds-separator>
      <p>Below</p>
      <div style="display: flex; align-items: center; gap: 12px">
        <span>vertical</span>
        <vds-separator orientation="vertical" style="height: 24px"></vds-separator>
        <span>separator</span>
      </div>
    </div>
  `,
  switch: () => html`
    <div class="demo">
      <div class="group">
        <div class="label">states</div>
        <div class="row">
          <vds-switch>Off</vds-switch>
          <vds-switch checked>On</vds-switch>
          <vds-switch disabled>Disabled</vds-switch>
        </div>
      </div>
      <div class="group">
        <div class="label">sizes</div>
        <div class="row">
          <vds-switch size="sm" checked>Small</vds-switch>
          <vds-switch size="md" checked>Medium</vds-switch>
          <vds-switch size="lg" checked>Large</vds-switch>
        </div>
      </div>
    </div>
  `,
  table: () => html`
    <div class="demo" style="display: block">
      <vds-table>
        <thead><tr><th align="left">Name</th><th align="left">Role</th><th align="right">Score</th></tr></thead>
        <tbody>
          <tr><td>Alice</td><td>Owner</td><td align="right">98</td></tr>
          <tr><td>Bob</td><td>Editor</td><td align="right">87</td></tr>
          <tr><td>Carol</td><td>Viewer</td><td align="right">72</td></tr>
        </tbody>
      </vds-table>
    </div>
  `,
  tabs: () => html`
    <div class="demo" style="display: block">
      <vds-tabs default-value="overview">
        <vds-tab value="overview">Overview</vds-tab>
        <vds-tab value="usage">Usage</vds-tab>
        <vds-tab value="api">API</vds-tab>
        <vds-tab-panel value="overview"><p>Overview content.</p></vds-tab-panel>
        <vds-tab-panel value="usage"><p>Usage content.</p></vds-tab-panel>
        <vds-tab-panel value="api"><p>API content.</p></vds-tab-panel>
      </vds-tabs>
    </div>
  `,
  'text-area': () => html`
    <div class="demo">
      <vds-text-area placeholder="Multi-line text" style="width: 320px; min-height: 100px"></vds-text-area>
      <vds-text-area disabled placeholder="Disabled" style="width: 320px"></vds-text-area>
    </div>
  `,
  'text-field': () => html`
    <div class="demo">
      <vds-text-field placeholder="Email" style="width: 240px"></vds-text-field>
      <vds-text-field type="password" placeholder="Password" style="width: 240px"></vds-text-field>
      <vds-text-field disabled placeholder="Disabled" style="width: 240px"></vds-text-field>
    </div>
  `,
  toast: () => html`
    <div class="demo">
      <vds-toast-group>
        <vds-toast tone="info"><div slot="title">Info</div>Information toast.</vds-toast>
        <vds-toast tone="success"><div slot="title">Saved</div>Changes saved.</vds-toast>
        <vds-toast tone="warning"><div slot="title">Warning</div>Heads up.</vds-toast>
      </vds-toast-group>
    </div>
  `,
  tooltip: () => html`
    <div class="demo">
      <vds-tooltip placement="top">
        <vds-button slot="trigger">Top</vds-button>
        Tooltip on top
      </vds-tooltip>
      <vds-tooltip placement="bottom">
        <vds-button slot="trigger">Bottom</vds-button>
        Tooltip on bottom
      </vds-tooltip>
      <vds-tooltip placement="left">
        <vds-button slot="trigger">Left</vds-button>
        Tooltip on left
      </vds-tooltip>
      <vds-tooltip placement="right">
        <vds-button slot="trigger">Right</vds-button>
        Tooltip on right
      </vds-tooltip>
    </div>
  `,
};
