import { VdsElement } from '../../base/vds-element.js';
type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
/**
 * <vds-box> — generic spacing wrapper. Replaces inline `padding/margin/max-width`
 * className patterns with token-bound props.
 *
 * @slot - content
 */
export declare class VdsBox extends VdsElement {
    static styles: import("lit").CSSResult;
    p?: Spacing;
    px?: Spacing;
    py?: Spacing;
    maxWidth?: MaxWidth;
    inline: boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
