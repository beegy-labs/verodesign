import { LitElement } from 'lit';
type Orientation = 'horizontal' | 'vertical';
/**
 * <vds-separator> — visual divider between sections.
 *
 * WAI-ARIA: when `decorative=true`, role=presentation (no semantic). When false, role=separator.
 */
export declare class VdsSeparator extends LitElement {
    static styles: import("lit").CSSResult;
    orientation: Orientation;
    decorative: boolean;
    private internals;
    constructor();
    connectedCallback(): void;
    protected updated(): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
