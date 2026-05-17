import { css } from 'lit';

export const focusRing = css`
  :host(:focus-visible),
  :host([data-focus]) {
    outline: 2px solid var(--vds-theme-border-focus);
    outline-offset: 2px;
  }
`;

export const srOnly = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: var(--vds-border-width-1);
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    :host {
      transition: none !important;
      animation: none !important;
    }
  }
`;
