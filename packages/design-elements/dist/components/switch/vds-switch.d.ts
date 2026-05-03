import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-switch> — toggle switch (WAI-ARIA AP 1.2 § Switch).
 *
 * Form-associated. Keyboard: Space and Enter toggle.
 *
 * @event change - { detail: { checked: boolean } }
 */
export declare class VdsSwitch extends VdsElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult;
    checked: boolean;
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
