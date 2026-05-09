import { VdsElement } from '../../base/vds-element.js';
type Align = 'left' | 'center' | 'right';
/**
 * <vds-th> — table header cell. Wraps a real <th> with token-based padding,
 * font-weight, alignment, and optional dim/compact styling.
 *
 * Use inside a <thead><tr>... — Lit renders into Light DOM via host display:contents
 * so this cell still participates in table layout.
 *
 * @csspart cell - underlying <th>
 */
export declare class VdsTh extends VdsElement {
    protected createRenderRoot(): this;
    static styles: import("lit").CSSResult;
    align: Align;
    compact: boolean;
    dim: boolean;
    colspan?: number;
    render(): import("lit").TemplateResult<1>;
    connectedCallback(): void;
}
export {};
