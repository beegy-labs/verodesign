import "../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import "../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { css as o } from "../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
const n = o`
  :host(:focus-visible),
  :host([data-focus]) {
    outline: 2px solid var(--vds-theme-border-focus);
    outline-offset: 2px;
  }
`, s = o`
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
`, d = o`
  @media (prefers-reduced-motion: reduce) {
    :host {
      transition: none !important;
      animation: none !important;
    }
  }
`;
export {
  n as focusRing,
  d as reducedMotion,
  s as srOnly
};
