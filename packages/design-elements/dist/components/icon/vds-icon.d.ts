import { nothing, svg, type TemplateResult } from 'lit';
import { VdsElement } from '../../base/vds-element.js';
export type IconName = 'activity' | 'arrow-down-right' | 'arrow-right-left' | 'arrow-up-right' | 'bell' | 'calendar' | 'check' | 'check-circle-2' | 'chevron-left' | 'chevron-right' | 'credit-card' | 'download' | 'edit-2' | 'file-text' | 'folder-edit' | 'history' | 'home' | 'landmark' | 'list' | 'menu' | 'more-horizontal' | 'pie-chart' | 'plus' | 'refresh-ccw' | 'settings' | 'shield-check' | 'shopping-bag' | 'target' | 'toggle-left' | 'toggle-right' | 'trash-2' | 'trending-up' | 'users' | 'wallet' | 'x' | 'zap';
export declare function registerIcon(name: IconName, content: TemplateResult): void;
/**
 * <vds-icon> — single icon web component backed by a name-to-svg registry.
 *
 * @attr {string} name - Registered icon name.
 * @attr {string} size - sm | md | lg | number-like CSS length.
 * @attr {number} stroke-width - SVG stroke width.
 */
export declare class VdsIcon extends VdsElement {
    static styles: import("lit").CSSResult;
    name: string;
    size: string;
    strokeWidth: number;
    protected updated(): void;
    render(): TemplateResult<1> | typeof nothing;
}
export { svg };
