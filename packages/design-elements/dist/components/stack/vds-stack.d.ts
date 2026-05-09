import { VdsElement } from '../../base/vds-element.js';
type Direction = 'column' | 'row';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
/**
 * <vds-stack> — flex layout primitive (replaces inline `display:flex` patterns).
 * Default: column direction, gap-0, align-stretch, justify-start.
 *
 * @slot - children flowed in `direction` with `gap`
 */
export declare class VdsStack extends VdsElement {
    static styles: import("lit").CSSResult;
    direction: Direction;
    gap: Gap;
    align?: Align;
    justify?: Justify;
    wrap: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
