import { LitElement, type PropertyValues } from 'lit';
/**
 * <vds-dialog> — modal dialog (WAI-ARIA AP 1.2 Dialog Modal pattern).
 *
 * - role="dialog", aria-modal="true"
 * - Focus trapped inside while open
 * - Esc closes
 * - Backdrop click closes (unless modal)
 * - Restores focus to trigger on close
 *
 * @slot title - dialog heading
 * @slot - main content
 * @slot footer - footer (typically buttons)
 * @event vds-open - dispatched when opened
 * @event vds-close - dispatched when closed
 */
export declare class VdsDialog extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    size: 'sm' | 'md' | 'lg';
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    ariaLabelText: string | null;
    private panelEl;
    private internals;
    private focusTrap?;
    private _titleId;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private handleOpen;
    private handleClose;
    private handleEscape;
    private handleBackdropClick;
    show(): void;
    hide(): void;
    render(): import("lit").TemplateResult<1>;
}
