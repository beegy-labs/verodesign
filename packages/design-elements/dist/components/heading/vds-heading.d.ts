import { type TemplateResult } from 'lit';
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
export declare class VdsHeading extends VdsElement {
    static styles: import("lit").CSSResult;
    /** Visual size + default semantic tag (h{level}). */
    level: Level;
    /** Override semantic tag without changing visual size. Accepts an HTML
     * tag name (`h1`..`h4`). When omitted, defaults to `h{level}`. */
    as?: AsTag;
    /** Color tone — default brightest, `default` is plain text, `muted` is secondary. */
    tone: Tone;
    render(): TemplateResult;
}
export {};
