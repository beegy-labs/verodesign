// © vero 2026. Verodesign icon component.
// SVG path data derived from Lucide (https://lucide.dev), ISC licensed.
import { css, html, nothing, svg, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { VdsElement } from '../../base/vds-element.js';

const ICON_SIZES = {
  sm: 'var(--vds-icon-size-sm)',
  md: 'var(--vds-icon-size-md)',
  lg: 'var(--vds-icon-size-lg)',
} as const;

const iconRegistry = new Map<string, TemplateResult>();
const warnedMissingIcons = new Set<string>();

export type IconName =
  | 'activity'
  | 'arrow-down-right'
  | 'arrow-right-left'
  | 'arrow-up-right'
  | 'bell'
  | 'calendar'
  | 'check'
  | 'check-circle-2'
  | 'chevron-left'
  | 'chevron-right'
  | 'credit-card'
  | 'download'
  | 'edit-2'
  | 'file-text'
  | 'folder-edit'
  | 'history'
  | 'home'
  | 'landmark'
  | 'list'
  | 'menu'
  | 'more-horizontal'
  | 'pie-chart'
  | 'plus'
  | 'refresh-ccw'
  | 'settings'
  | 'shield-check'
  | 'shopping-bag'
  | 'target'
  | 'toggle-left'
  | 'toggle-right'
  | 'trash-2'
  | 'trending-up'
  | 'users'
  | 'wallet'
  | 'x'
  | 'zap';

export function registerIcon(name: IconName, content: TemplateResult) {
  iconRegistry.set(name, content);
}

function resolveSize(size: string) {
  if (size in ICON_SIZES) {
    return ICON_SIZES[size as keyof typeof ICON_SIZES];
  }

  if (/^\d+(\.\d+)?$/.test(size)) {
    return `${size}px`;
  }

  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(size)) {
    return size;
  }

  return ICON_SIZES.md;
}

/**
 * <vds-icon> — single icon web component backed by a name-to-svg registry.
 *
 * @attr {string} name - Registered icon name.
 * @attr {string} size - sm | md | lg | number-like CSS length.
 * @attr {number} stroke-width - SVG stroke width.
 */
export class VdsIcon extends VdsElement {
  static styles = css`
    :host {
      display: inline-flex;
      color: currentColor;
      vertical-align: middle;
      flex: 0 0 auto;
    }

    :host([hidden]) {
      display: none;
    }

    svg {
      inline-size: 100%;
      block-size: 100%;
      display: block;
      overflow: visible;
    }
  `;

  @property({ type: String, reflect: true }) name = '';
  @property({ type: String, reflect: true }) size = 'md';
  @property({ type: Number, attribute: 'stroke-width', reflect: true }) strokeWidth = 2;

  protected updated(): void {
    const label = this.getAttribute('aria-label');
    if (label && label.trim().length > 0) {
      this.setAttribute('role', 'img');
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  render() {
    const icon = iconRegistry.get(this.name);
    const strokeWidthValue = this.hasAttribute('stroke-width')
      ? String(this.strokeWidth || 2)
      : 'var(--vds-icon-stroke-width)';

    if (!icon) {
      if (this.name && !warnedMissingIcons.has(this.name)) {
        warnedMissingIcons.add(this.name);
        console.warn(`[vds-icon] Unknown icon "${this.name}".`);
      }
      return nothing;
    }

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        focusable="false"
        aria-hidden="true"
        style=${`inline-size: ${resolveSize(this.size)}; block-size: ${resolveSize(this.size)}; stroke-width: ${strokeWidthValue};`}
      >
        ${icon}
      </svg>
    `;
  }
}

export { svg };
