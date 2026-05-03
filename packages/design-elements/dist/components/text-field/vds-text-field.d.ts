import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-text-field> — text input with label, helper, error states. WAI-ARIA AP 1.2 textbox pattern.
 * Form-Associated Custom Element via ElementInternals.
 */
export declare class VdsTextField extends VdsElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult[];
    value: string;
    name?: string;
    label?: string;
    helper?: string;
    errorMessage?: string;
    placeholder?: string;
    type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
    size: Size;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    autocomplete?: string;
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    private inputEl;
    private _touched;
    private internals;
    private _labelId;
    private _helperId;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private syncFormValue;
    private syncValidity;
    private handleInput;
    private handleChange;
    private handleBlur;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    formStateRestoreCallback(state: string | FormData | File | null): void;
    focus(): void;
    select(): void;
    reportValidity(): boolean;
    checkValidity(): boolean;
    render(): import("lit").TemplateResult<1>;
}
export {};
