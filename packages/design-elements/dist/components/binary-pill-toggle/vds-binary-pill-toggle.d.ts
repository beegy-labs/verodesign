import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Emphasis = 'neutral' | 'success' | 'destructive' | 'brand';
type Size = 'sm' | 'md';
export declare class VdsBinaryPillToggle extends VdsElement {
    static formAssociated: boolean;
    static styles: import("lit").CSSResult;
    value: string;
    emphasis: Emphasis;
    size: Size;
    disabled: boolean;
    ariaLabel: string | null;
    private internals;
    private optionsCache;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private get options();
    private refreshOptions;
    private syncOptions;
    private isOptionDisabled;
    private commit;
    private move;
    private handleClick;
    private handleKeydown;
    render(): import("lit").TemplateResult<1>;
}
export declare class VdsBinaryPillToggleOption extends VdsElement {
    static styles: import("lit").CSSResult;
    value: string;
    disabled: boolean;
    checked: boolean;
    emphasis: Emphasis;
    size: Size;
    groupDisabled: boolean;
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
