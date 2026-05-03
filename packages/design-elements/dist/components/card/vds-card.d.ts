import { VdsElement } from '../../base/vds-element.js';
type Elevation = '0' | '1' | '2' | '3' | '4' | '5';
type Variant = 'surface' | 'outline' | 'ghost';
/**
 * <vds-card> — surface container with optional elevation and structured slots.
 *
 * @slot - main body content
 * @slot header - top header content
 * @slot footer - bottom footer content
 */
export declare class VdsCard extends VdsElement {
    static styles: import("lit").CSSResult;
    variant: Variant;
    elevation: Elevation;
    render(): import("lit").TemplateResult<1>;
}
export {};
