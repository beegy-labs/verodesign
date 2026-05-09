import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

type Shape = 'rect' | 'circle' | 'text';

/**
 * <vds-skeleton> — loading placeholder. Animated shimmer.
 * `shape="rect"` (default) for blocks, `circle` for avatars, `text` for inline text.
 */
export class VdsSkeleton extends VdsElement {
  static styles = css`
    :host {
      display: block;
      background: linear-gradient(
        90deg,
        var(--vds-theme-bg-muted) 0%,
        var(--vds-theme-bg-hover) 50%,
        var(--vds-theme-bg-muted) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
      border-radius: var(--vds-radius-md);
      width: 100%;
      height: var(--vds-spacing-4);
    }
    :host([hidden]) { display: none; }
    :host([shape="circle"]) { border-radius: var(--vds-radius-full); aspect-ratio: 1; height: var(--vds-spacing-10); width: var(--vds-spacing-10); }
    :host([shape="text"]) { height: var(--vds-spacing-4); border-radius: var(--vds-radius-sm); }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
    }
  `;

  @property({ type: String, reflect: true }) shape: Shape = 'rect';

  render() { return html``; }
}
