import { VdsElement } from '../../base/vds-element.js';
type Cols = '1' | '2' | '3' | '4' | '5' | '6' | '12';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
/**
 * <vds-grid> — CSS grid layout primitive.
 *
 * @slot - children laid in `cols` columns with `gap`
 */
export declare class VdsGrid extends VdsElement {
    static styles: import("lit").CSSResult;
    cols: Cols;
    gap: Gap;
    render(): import("lit").TemplateResult<1>;
}
export {};
