import { LitElement, type PropertyValues } from 'lit';
/**
 * <vds-menu> — Menu Button + Menu (WAI-ARIA AP 1.2 Menu Button pattern).
 *
 * Use <vds-menu-item> as children. The trigger is provided via slot="trigger".
 * Arrow keys navigate items; Enter/Space activates; Esc closes; type-ahead supported.
 *
 * @event vds-select - dispatched when an item is activated, detail { value }
 */
export declare class VdsMenu extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    placement: 'bottom-start' | 'bottom-end';
    private menuEl;
    private internals;
    private typeBuffer;
    private typeTimer;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private getTrigger;
    private getItems;
    private handleClick;
    private handleKeydown;
    private handleTypeAhead;
    private handleOutsideClick;
    private activate;
    show(): void;
    hide(): void;
    render(): import("lit").TemplateResult<1>;
}
export declare class VdsMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    disabled: boolean;
    tone: 'default' | 'destructive';
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
