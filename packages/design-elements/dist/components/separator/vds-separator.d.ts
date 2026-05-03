import { type PropertyValues } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
type Orientation = 'horizontal' | 'vertical';
/**
 * <vds-separator> — visual divider between sections.
 *
 * WAI-ARIA: when `decorative=true`, role=presentation (no semantic). When false, role=separator.
 */
export declare class VdsSeparator extends VdsElement {
    static styles: import("lit").CSSResult;
    orientation: Orientation;
    decorative: boolean;
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
