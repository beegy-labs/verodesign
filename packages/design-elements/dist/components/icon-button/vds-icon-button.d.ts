import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Variant = 'ghost' | 'soft' | 'outline';
type Tone = 'neutral' | 'primary' | 'destructive';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-icon-button> — square icon-only button. WAI-ARIA AP 1.2 button pattern.
 * Always requires `aria-label` (or `ariaLabelText`) for screen readers.
 *
 * @csspart button - underlying button
 * @slot - icon content (svg recommended)
 */
export declare class VdsIconButton extends VdsElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult[];
    variant: Variant;
    tone: Tone;
    size: Size;
    disabled: boolean;
    ariaLabelText: string | null;
    private internals;
    constructor();
    protected updated(changed: PropertyValues): void;
    connectedCallback(): void;
    private handleClick;
    private handleKeydown;
    render(): import("lit").TemplateResult<1>;
}
export {};
