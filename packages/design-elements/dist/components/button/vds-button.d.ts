import { LitElement, type PropertyValues } from 'lit';
type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
type Tone = 'primary' | 'accent' | 'neutral' | 'destructive';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-button> — accessible button (WAI-ARIA AP 1.2 button pattern).
 *
 * Form-associated: when `type="submit"` or `type="reset"` and placed inside a `<form>`,
 * the click submits/resets the form.
 *
 * @csspart button - the underlying button element
 * @slot - button label
 * @slot start - leading icon
 * @slot end - trailing icon
 */
export declare class VdsButton extends LitElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult[];
    variant: Variant;
    tone: Tone;
    size: Size;
    type: 'button' | 'submit' | 'reset';
    disabled: boolean;
    loading: boolean;
    name?: string;
    value?: string;
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
