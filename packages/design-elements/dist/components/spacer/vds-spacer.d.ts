import { VdsElement } from '../../base/vds-element.js';
type Size = '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type Axis = 'horizontal' | 'vertical';
/**
 * <vds-spacer> — empty space element. Either fixed `size` (token spacing) or
 * `grow` to fill remaining flex space.
 */
export declare class VdsSpacer extends VdsElement {
    static styles: import("lit").CSSResult;
    axis: Axis;
    size?: Size;
    grow: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
