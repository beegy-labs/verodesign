import { VdsElement } from '../../base/vds-element.js';
type Variant = 'default' | 'padded' | 'section' | 'inset' | 'divided';
type Radius = 'lg' | 'xl';
/**
 * <vds-surface> — bordered container primitive. Replaces inline
 * `rounded + border + bg-card` patterns. Variants:
 *
 *   - default:  border + radius, no padding (caller controls inner spacing)
 *   - padded:   default + spacing-5 padding
 *   - section:  default + spacing-5 padding + spacing-4 vertical gap between children
 *   - inset:    default + overflow-hidden (lists / tables flush with border radius)
 *   - divided:  default + horizontal divider between children
 */
export declare class VdsSurface extends VdsElement {
    static styles: import("lit").CSSResult;
    variant: Variant;
    radius: Radius;
    borderless: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
