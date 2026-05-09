import { VdsElement } from '../../base/vds-element.js';
type Size = 'sm' | 'md' | 'lg';
/**
 * <vds-empty-state> — generic "no data" placeholder. Stack of icon + title +
 * description + action (all optional via slots).
 *
 * @slot icon - optional leading icon
 * @slot - default slot: title text (also accepts `heading` prop)
 * @slot description - optional description text
 * @slot action - optional action button
 */
export declare class VdsEmptyState extends VdsElement {
    static styles: import("lit").CSSResult;
    size: Size;
    heading?: string;
    description?: string;
    render(): import("lit").TemplateResult<1>;
}
export {};
