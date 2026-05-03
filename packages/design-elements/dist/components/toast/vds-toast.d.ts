import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Tone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
/**
 * <vds-toast> — single toast notification (live region pattern).
 *
 * Use programmatically via <vds-toast-group>.publish(), or place declaratively.
 *
 * @event vds-dismiss - dispatched when toast is dismissed
 */
export declare class VdsToast extends VdsElement {
    static styles: import("lit").CSSResult;
    toastTitle?: string;
    message?: string;
    tone: Tone;
    duration: number;
    dismissible: boolean;
    private internals;
    private _timer;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    private syncAria;
    dismiss(): void;
    render(): import("lit").TemplateResult<1>;
}
/**
 * <vds-toast-group> — toast container with positioning and queue.
 *
 * Programmatic use:
 *   const group = document.querySelector('vds-toast-group');
 *   group.publish({ title: 'Saved', tone: 'success' });
 */
export declare class VdsToastGroup extends VdsElement {
    static styles: import("lit").CSSResult;
    placement: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    max: number;
    private internals;
    constructor();
    publish(opts: {
        title?: string;
        message?: string;
        tone?: Tone;
        duration?: number;
        dismissible?: boolean;
    }): VdsToast;
    render(): import("lit").TemplateResult<1>;
}
export {};
