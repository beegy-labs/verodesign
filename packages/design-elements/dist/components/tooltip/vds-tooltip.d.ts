import { LitElement, type PropertyValues } from 'lit';
type Placement = 'top' | 'right' | 'bottom' | 'left';
/**
 * <vds-tooltip> — non-interactive descriptive tooltip (WAI-ARIA AP 1.2 § Tooltip).
 *
 * Trigger: focus or hover on the slotted trigger element. Esc dismisses.
 * Renders a tip that is `role=tooltip` and is referenced by `aria-describedby`.
 *
 * @slot trigger - the element that triggers the tooltip
 * @slot - the tooltip content
 */
export declare class VdsTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    placement: Placement;
    delay: number;
    disabled: boolean;
    private open;
    private internals;
    private timer;
    private tipId;
    constructor();
    protected updated(_: PropertyValues): void;
    private show;
    private hide;
    private handleKey;
    render(): import("lit").TemplateResult<1>;
}
export {};
