import { VdsElement } from '../../base/vds-element.js';
type DeltaTone = 'positive' | 'negative' | 'neutral';
type Tone = 'default' | 'success' | 'warning' | 'error';
/**
 * <vds-stat-tile> — KPI metric tile. Renders label + value + optional delta
 * change indicator + optional hint line + leading icon slot.
 *
 * @slot icon - leading icon (small, top-right of tile)
 */
export declare class VdsStatTile extends VdsElement {
    static styles: import("lit").CSSResult;
    label: string;
    value: string;
    delta?: string;
    hint?: string;
    deltaTone: DeltaTone;
    tone: Tone;
    render(): import("lit").TemplateResult<1>;
}
export {};
