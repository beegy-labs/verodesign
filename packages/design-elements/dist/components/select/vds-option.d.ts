import { LitElement } from 'lit';
/**
 * <vds-option> — option for <vds-select>. Slot project the label.
 */
export declare class VdsOption extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    selected: boolean;
    disabled: boolean;
    private internals;
    constructor();
    render(): import("lit").TemplateResult<1>;
}
