import { VdsElement } from '../../base/vds-element.js';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-label> — accessible form-field label.
 *
 * Mirrors HTML `<label for="">` semantics. When `for=` matches a sibling form
 * control, clicks on the label focus that control (browser default).
 *
 * @slot - label text
 */
export declare class VdsLabel extends VdsElement {
    static styles: import("lit").CSSResult;
    for?: string;
    required: boolean;
    size: Size;
    connectedCallback(): void;
    private handleClick;
    render(): import("lit").TemplateResult<1>;
}
export {};
