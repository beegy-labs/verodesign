import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { literal, html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { VdsElement } from '../../base/vds-element.js';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Tone = 'default' | 'bright' | 'dim' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
type Weight = '400' | '500' | '600' | '700';
type Align = 'left' | 'center' | 'right';
type AsTag = 'p' | 'span' | 'div';

/**
 * <vds-text> — typography primitive. Replaces inline `vds-text-*`/`vds-font-*`
 * className patterns with token-bound props.
 *
 * @slot - text content
 */
export class VdsText extends VdsElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
      margin: 0;
    }
    :host([as="span"]) { display: inline; }
    :host([hidden]) { display: none; }

    :host([size="xs"])    { font-size: var(--vds-type-role-caption-size); }
    :host([size="sm"])    { font-size: var(--vds-type-role-label-size); }
    :host([size="base"])  { font-size: var(--vds-type-role-body-size); }
    :host([size="lg"])    { font-size: var(--vds-type-role-title-size); }
    :host([size="xl"])    { font-size: var(--vds-type-role-metric-size); }

    :host([tone="bright"])  { color: var(--vds-theme-text-bright); }
    :host([tone="dim"])     { color: var(--vds-theme-text-secondary); }
    :host([tone="muted"])   { color: var(--vds-theme-text-faint); }
    :host([tone="primary"]) { color: var(--vds-theme-primary); }
    :host([tone="success"]) { color: var(--vds-theme-success); }
    :host([tone="warning"]) { color: var(--vds-theme-warning); }
    :host([tone="error"])   { color: var(--vds-theme-destructive); }

    :host([weight="400"]) { font-weight: var(--vds-font-weight-400); }
    :host([weight="500"]) { font-weight: var(--vds-font-weight-500); }
    :host([weight="600"]) { font-weight: var(--vds-font-weight-600); }
    :host([weight="700"]) { font-weight: var(--vds-font-weight-700); }

    :host([align="left"])   { text-align: left; }
    :host([align="center"]) { text-align: center; }
    :host([align="right"])  { text-align: right; }

    :host([truncate]) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host([uppercase]) { text-transform: uppercase; letter-spacing: 0.05em; }
    :host([mono]) { font-family: var(--vds-font-family-mono); }
    :host([tabular]) { font-variant-numeric: tabular-nums; }
  `;

  @property({ type: String, reflect: true }) size?: Size;
  @property({ type: String, reflect: true }) tone?: Tone;
  @property({ type: String, reflect: true }) weight?: Weight;
  @property({ type: String, reflect: true }) align?: Align;
  @property({ type: String, reflect: true }) as?: AsTag;
  @property({ type: Boolean, reflect: true }) truncate = false;
  @property({ type: Boolean, reflect: true }) uppercase = false;
  @property({ type: Boolean, reflect: true }) mono = false;
  @property({ type: Boolean, reflect: true }) tabular = false;

  render() {
    return html`<slot></slot>`;
  }
}
