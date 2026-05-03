import { css as o } from "lit";
const e = o`
  :host(:focus-visible),
  :host([data-focus]) {
    outline: 2px solid var(--vds-theme-border-focus);
    outline-offset: 2px;
  }
`, i = o`
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
`, n = o`
  @media (prefers-reduced-motion: reduce) {
    :host {
      transition: none !important;
      animation: none !important;
    }
  }
`;
export {
  e as focusRing,
  n as reducedMotion,
  i as srOnly
};
