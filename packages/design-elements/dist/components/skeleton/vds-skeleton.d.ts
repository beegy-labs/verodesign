import { VdsElement } from '../../base/vds-element.js';
type Shape = 'rect' | 'circle' | 'text';
/**
 * <vds-skeleton> — loading placeholder. Animated shimmer.
 * `shape="rect"` (default) for blocks, `circle` for avatars, `text` for inline text.
 */
export declare class VdsSkeleton extends VdsElement {
    static styles: import("lit").CSSResult;
    shape: Shape;
    render(): import("lit").TemplateResult<1>;
}
export {};
