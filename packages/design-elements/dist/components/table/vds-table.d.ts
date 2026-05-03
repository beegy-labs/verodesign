import { VdsElement } from '../../base/vds-element.js';
type Density = 'compact' | 'normal' | 'comfortable';
/**
 * <vds-table> — semantic table wrapper. Renders inside a `<table>` and applies
 * theme-token styling. Use standard `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
 * inside.
 *
 * @slot caption - <caption>
 * @slot - table contents (thead/tbody/tfoot)
 */
export declare class VdsTable extends VdsElement {
    static styles: import("lit").CSSResult;
    density: Density;
    render(): import("lit").TemplateResult<1>;
}
export {};
