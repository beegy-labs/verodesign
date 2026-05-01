/**
 * Mirror ARIA properties from ElementInternals to attributes for browsers
 * that lack ARIA reflection on internals (Firefox as of 2026-04).
 *
 * Each writer below sets BOTH internals.aria* (for Chromium/WebKit) AND the
 * matching attribute on the host element (for Firefox accessibility tree).
 */
type AriaInternalsKey = 'role' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy' | 'ariaPressed' | 'ariaExpanded' | 'ariaHasPopup' | 'ariaSelected' | 'ariaChecked' | 'ariaCurrent' | 'ariaDisabled' | 'ariaHidden' | 'ariaInvalid' | 'ariaRequired' | 'ariaModal' | 'ariaOrientation' | 'ariaLive' | 'ariaAtomic' | 'ariaActiveDescendantElement' | 'ariaControlsElements' | 'ariaOwnsElements';
declare function supportsInternalsAriaReflection(): boolean;
export declare function setAriaProperty(host: HTMLElement, internals: ElementInternals, key: AriaInternalsKey, value: string | boolean | null | Element | Element[]): void;
export declare function setRole(host: HTMLElement, internals: ElementInternals, role: string | null): void;
export declare const __testing__: {
    supportsInternalsAriaReflection: typeof supportsInternalsAriaReflection;
};
export {};
