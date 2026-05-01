import { LitElement, type PropertyValues } from 'lit';
/**
 * <vds-select> — select-only combobox (WAI-ARIA AP 1.2 § Combobox, select-only).
 *
 * Children: <vds-option value="..."> elements. Form-associated.
 * Keyboard: Enter/Space toggles open. ArrowDown/Up to navigate. Esc closes. Type-ahead supported.
 *
 * @event change - { detail: { value: string } }
 */
export declare class VdsSelect extends LitElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult;
    value: string;
    placeholder: string;
    disabled: boolean;
    required: boolean;
    name?: string;
    private open;
    private activeIndex;
    private displayLabel;
    private triggerEl;
    private listboxEl;
    private internals;
    private typeBuffer;
    private typeBufferTimer;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private get options();
    private findOptionByValue;
    private refreshOptions;
    private refreshSelected;
    private setActive;
    private toggle;
    private commit;
    private handleKey;
    private handleTriggerClick;
    private handleListClick;
    render(): import("lit").TemplateResult<1>;
}
