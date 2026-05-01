import { css } from "lit";
const focusRing = css`
  :host(:focus-visible),
  :host([data-focus]) {
    outline: 2px solid var(--vds-theme-border-focus);
    outline-offset: 2px;
  }
`;
const srOnly = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`;
const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    :host {
      transition: none !important;
      animation: none !important;
    }
  }
`;
export {
  focusRing,
  reducedMotion,
  srOnly
};
//# sourceMappingURL=shared.js.map
