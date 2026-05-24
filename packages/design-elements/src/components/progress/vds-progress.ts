import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { VdsElement } from '../../base/vds-element.js';

type ProgressTone = 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
type ProgressSize = 'sm' | 'md' | 'lg';

const TONE_FILL: Record<Exclude<ProgressTone, 'primary'>, string> = {
  success: 'var(--vds-theme-status-success)',
  destructive: 'var(--vds-theme-status-destructive)',
  warning: 'var(--vds-theme-status-warning)',
  neutral: 'var(--vds-theme-text-dim)',
};

export class VdsProgress extends VdsElement {
  static styles = css`
    :host {
      display: block;
      inline-size: 100%;
    }

    .root {
      position: relative;
      inline-size: 100%;
      block-size: var(--_progress-height);
      overflow: hidden;
      border-radius: var(--vds-radius-full);
      background: var(--vds-exp-girok-redesign-progress-track-bg);
    }

    .fill {
      block-size: 100%;
      border-radius: inherit;
      background: var(--_progress-fill);
      transition: inline-size var(--vds-duration-medium) var(--vds-easing-ease-out);
    }

    :host([indeterminate]) .fill {
      inline-size: 42%;
      animation: vds-progress-indeterminate 1.2s var(--vds-easing-ease-out) infinite;
    }

    :host([size="sm"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-sm); }
    :host([size="md"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-md); }
    :host([size="lg"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-lg); }

    @keyframes vds-progress-indeterminate {
      0% { transform: translateX(-120%); }
      100% { transform: translateX(260%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }

      :host([indeterminate]) .fill {
        animation: none;
        transform: translateX(0);
      }
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number, attribute: 'min' }) min = 0;
  @property({ type: String, reflect: true }) tone: ProgressTone = 'primary';
  @property({ type: String, reflect: true }) size: ProgressSize = 'md';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabelText: string | null = null;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'progressbar');
  }

  protected updated(): void {
    const label = this.ariaLabelText?.trim();
    if (label) {
      setAriaProperty(this, this.internals, 'ariaLabel', label);
    }

    if (this.indeterminate) {
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuemin');
      this.removeAttribute('aria-valuemax');
      return;
    }

    const clamped = this.clampedValue;
    this.setAttribute('aria-valuemin', String(this.min));
    this.setAttribute('aria-valuemax', String(this.safeMax));
    this.setAttribute('aria-valuenow', String(clamped));
  }

  private get safeMax(): number {
    return this.max > this.min ? this.max : this.min + 1;
  }

  private get clampedValue(): number {
    return Math.min(Math.max(this.value, this.min), this.safeMax);
  }

  private get ratio(): number {
    return ((this.clampedValue - this.min) / (this.safeMax - this.min)) * 100;
  }

  private get fillStyle(): string {
    if (this.tone === 'primary') {
      return `linear-gradient(90deg, var(--vds-exp-girok-progress-goal-fill-start), var(--vds-exp-girok-progress-goal-fill-end))`;
    }
    return TONE_FILL[this.tone];
  }

  render() {
    const width = this.indeterminate ? nothing : `${this.ratio}%`;
    return html`
      <div class="root" part="track" style=${`--_progress-fill: ${this.fillStyle};`}>
        <div class="fill" part="fill" style=${width === nothing ? nothing : `inline-size: ${width};`}></div>
      </div>
    `;
  }
}
