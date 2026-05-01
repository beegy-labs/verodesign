import { LitElement, type PropertyValues } from 'lit';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-checkbox> — tri-state checkbox (WAI-ARIA AP 1.2 § Checkbox).
 *
 * Form-associated. Keyboard: Space toggles.
 *
 * @slot - label text (rendered after the checkbox)
 * @event change - { detail: { checked: boolean } }
 */
export declare class VdsCheckbox extends LitElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult;
    checked: boolean;
    indeterminate: boolean;
    disabled: boolean;
    required: boolean;
    name?: string;
    value: string;
    size: Size;
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private syncAria;
    private syncFormValue;
    private handleClick;
    private handleKeydown;
    toggle(): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
