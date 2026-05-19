import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type DeltaTone = 'positive' | 'negative' | 'neutral';
type Tone = 'default' | 'success' | 'warning' | 'error';

/**
 * <vds-stat-tile> — KPI metric tile. Renders label + value + optional delta
 * change indicator + optional hint line + leading icon slot.
 *
 * @slot icon - leading icon (small, top-right of tile)
 */
export class VdsStatTile extends VdsElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      background: var(--vds-theme-bg-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-lg);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-2);
    }
    .label {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
    }
    .icon { color: var(--vds-theme-text-faint); display: flex; }
    .icon ::slotted(*) { width: var(--vds-spacing-4); height: var(--vds-spacing-4); }

    .value {
      font-size: var(--vds-type-role-metric-size);
      font-weight: var(--vds-type-role-metric-weight);
      color: var(--vds-theme-text-bright);
      line-height: var(--vds-type-role-metric-lineheight);
      font-variant-numeric: tabular-nums;
    }
    :host([tone="success"]) .value { color: var(--vds-theme-success); }
    :host([tone="warning"]) .value { color: var(--vds-theme-warning); }
    :host([tone="error"])   .value { color: var(--vds-theme-destructive); }

    .meta {
      display: flex;
      align-items: baseline;
      gap: var(--vds-spacing-2);
      flex-wrap: wrap;
    }
    .delta {
      font-size: var(--vds-type-role-caption-size);
      font-weight: var(--vds-type-role-label-weight);
    }
    :host([delta-tone="positive"]) .delta { color: var(--vds-theme-success); }
    :host([delta-tone="negative"]) .delta { color: var(--vds-theme-destructive); }
    :host([delta-tone="neutral"])  .delta { color: var(--vds-theme-text-secondary); }
    .delta:empty { display: none; }

    .hint {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
    }
    .hint:empty { display: none; }
    .meta:has(.delta:empty):has(.hint:empty) { display: none; }
  `;

  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) delta?: string;
  @property({ type: String }) hint?: string;
  @property({ type: String, reflect: true, attribute: 'delta-tone' }) deltaTone: DeltaTone = 'neutral';
  @property({ type: String, reflect: true }) tone: Tone = 'default';

  render() {
    return html`
      <div class="header">
        <span class="label">${this.label}</span>
        <span class="icon"><slot name="icon"></slot></span>
      </div>
      <span class="value">${this.value}</span>
      <div class="meta">
        <span class="delta">${this.delta ?? ''}</span>
        <span class="hint">${this.hint ?? ''}</span>
      </div>
    `;
  }
}
