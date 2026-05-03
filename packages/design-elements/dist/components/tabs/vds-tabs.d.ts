import { LitElement, type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
/**
 * <vds-tabs> — WAI-ARIA AP 1.2 Tabs pattern.
 *
 * Children: <vds-tab value="x"> and <vds-tab-panel value="x">.
 * Arrow keys navigate. Auto-activation by default; manual via `activation="manual"`.
 *
 * @event vds-change - dispatched on active tab change with detail { value }
 */
export declare class VdsTabs extends VdsElement {
    static styles: import("lit").CSSResult;
    value: string;
    orientation: 'horizontal' | 'vertical';
    activation: 'auto' | 'manual';
    private internals;
    private tabsCache;
    private panelsCache;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private get tabs();
    private get panels();
    private refreshChildren;
    private syncActive;
    private setActive;
    private handleClick;
    private handleKeydown;
    render(): import("lit").TemplateResult<1>;
}
export declare class VdsTab extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    disabled: boolean;
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
export declare class VdsTabPanel extends LitElement {
    static styles: import("lit").CSSResult;
    value: string;
    private internals;
    constructor();
    render(): import("lit").TemplateResult<1>;
}
