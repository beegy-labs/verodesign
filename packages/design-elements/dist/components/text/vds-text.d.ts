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
export declare class VdsText extends VdsElement {
    static styles: import("lit").CSSResult;
    size?: Size;
    tone?: Tone;
    weight?: Weight;
    align?: Align;
    as?: AsTag;
    truncate: boolean;
    uppercase: boolean;
    mono: boolean;
    tabular: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
