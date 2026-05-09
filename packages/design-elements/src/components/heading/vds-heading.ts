import { css, type TemplateResult } from 'lit';
import { html, literal, unsafeStatic } from 'lit/static-html.js';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Level = '1' | '2' | '3' | '4';
type AsTag = 'h1' | 'h2' | 'h3' | 'h4';
type Tone = 'bright' | 'default' | 'muted';

/**
 * <vds-heading> — typography heading. Renders an internal h1..h4 element
 * matching `level` (or overridden via `as`). Visual size scales with level.
 *
 * @slot - heading content (text)
 * @csspart heading - the underlying h1..h4 element
 */
export class VdsHeading extends VdsElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
    }
    :host([hidden]) { display: none; }

    .heading {
      margin: 0;
      font-weight: var(--vds-font-weight-700);
      line-height: var(--vds-font-lineheight-snug);
      color: var(--vds-theme-text-bright);
    }
    :host([level="1"]) .heading { font-size: var(--vds-font-size-2xl); }
    :host([level="2"]) .heading { font-size: var(--vds-font-size-xl); }
    :host([level="3"]) .heading { font-size: var(--vds-font-size-lg); }
    :host([level="4"]) .heading { font-size: var(--vds-font-size-base); }

    :host([tone="default"]) .heading { color: var(--vds-theme-text-primary); }
    :host([tone="muted"])   .heading { color: var(--vds-theme-text-secondary); }
  `;

  /** Visual size + default semantic tag (h{level}). */
  @property({ type: String, reflect: true }) level: Level = '1';
  /** Override semantic tag without changing visual size. Accepts an HTML
   * tag name (`h1`..`h4`). When omitted, defaults to `h{level}`. */
  @property({ type: String }) as?: AsTag;
  /** Color tone — default brightest, `default` is plain text, `muted` is secondary. */
  @property({ type: String, reflect: true }) tone: Tone = 'bright';

  render(): TemplateResult {
    const tag = this.as ?? `h${this.level}` as AsTag;
    const t = tag === 'h1' ? literal`h1`
            : tag === 'h2' ? literal`h2`
            : tag === 'h3' ? literal`h3`
            : literal`h4`;
    return html`<${t} class="heading" part="heading"><slot></slot></${t}>`;
  }
}
