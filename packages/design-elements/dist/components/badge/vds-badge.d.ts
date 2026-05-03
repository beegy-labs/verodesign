import { VdsElement } from '../../base/vds-element.js';
type Variant = 'solid' | 'soft' | 'outline';
type Tone = 'primary' | 'accent' | 'neutral' | 'destructive' | 'success' | 'warning' | 'info';
type Size = 'sm' | 'md';
/**
 * <vds-badge> — small inline status / count indicator.
 *
 * @slot - badge label
 * @slot start - leading icon
 * @slot end - trailing icon
 */
export declare class VdsBadge extends VdsElement {
    static styles: import("lit").CSSResult;
    variant: Variant;
    tone: Tone;
    size: Size;
    render(): import("lit").TemplateResult<1>;
}
export {};
