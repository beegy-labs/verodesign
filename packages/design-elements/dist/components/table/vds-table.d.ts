import { LitElement } from 'lit';
type Density = 'compact' | 'normal' | 'comfortable';
/**
 * <vds-table> — semantic table wrapper. Renders inside a `<table>` and applies
 * theme-token styling. Use standard `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
 * inside.
 *
 * @slot caption - <caption>
 * @slot - table contents (thead/tbody/tfoot)
 */
export declare class VdsTable extends LitElement {
    static styles: import("lit").CSSResult;
    density: Density;
    connectedCallback(): void;
    protected updated(): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
