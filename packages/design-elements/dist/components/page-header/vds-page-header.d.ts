import { VdsElement } from '../../base/vds-element.js';
/**
 * <vds-page-header> — page-level title row.
 * Renders title (h1) + optional subtitle, with right-aligned `actions` slot.
 *
 * @slot actions - right-aligned action elements (buttons, etc.)
 */
export declare class VdsPageHeader extends VdsElement {
    static styles: import("lit").CSSResult;
    heading?: string;
    subtitle?: string;
    render(): import("lit").TemplateResult<1>;
}
