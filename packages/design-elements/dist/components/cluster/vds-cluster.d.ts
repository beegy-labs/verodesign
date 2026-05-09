import { VdsElement } from '../../base/vds-element.js';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
/**
 * <vds-cluster> — horizontal flex cluster with auto-wrap.
 * Use for tag lists, action button rows, breadcrumbs.
 *
 * @slot - children laid horizontally, wrapping by default
 */
export declare class VdsCluster extends VdsElement {
    static styles: import("lit").CSSResult;
    gap: Gap;
    align?: Align;
    justify?: Justify;
    nowrap: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
