/**
 * Mirror ARIA properties from ElementInternals to attributes for browsers
 * that lack ARIA reflection on internals (Firefox as of 2026-04).
 *
 * Each writer below sets BOTH internals.aria* (for Chromium/WebKit) AND the
 * matching attribute on the host element (for Firefox accessibility tree).
 */

type AriaInternalsKey =
  | 'role'
  | 'ariaLabel'
  | 'ariaLabelledBy'
  | 'ariaDescribedBy'
  | 'ariaPressed'
  | 'ariaExpanded'
  | 'ariaHasPopup'
  | 'ariaSelected'
  | 'ariaChecked'
  | 'ariaCurrent'
  | 'ariaDisabled'
  | 'ariaHidden'
  | 'ariaInvalid'
  | 'ariaRequired'
  | 'ariaModal'
  | 'ariaOrientation'
  | 'ariaLive'
  | 'ariaAtomic'
  | 'ariaActiveDescendantElement'
  | 'ariaControlsElements'
  | 'ariaOwnsElements';

const KEY_TO_ATTR: Record<AriaInternalsKey, string> = {
  role: 'role',
  ariaLabel: 'aria-label',
  ariaLabelledBy: 'aria-labelledby',
  ariaDescribedBy: 'aria-describedby',
  ariaPressed: 'aria-pressed',
  ariaExpanded: 'aria-expanded',
  ariaHasPopup: 'aria-haspopup',
  ariaSelected: 'aria-selected',
  ariaChecked: 'aria-checked',
  ariaCurrent: 'aria-current',
  ariaDisabled: 'aria-disabled',
  ariaHidden: 'aria-hidden',
  ariaInvalid: 'aria-invalid',
  ariaRequired: 'aria-required',
  ariaModal: 'aria-modal',
  ariaOrientation: 'aria-orientation',
  ariaLive: 'aria-live',
  ariaAtomic: 'aria-atomic',
  ariaActiveDescendantElement: 'aria-activedescendant',
  ariaControlsElements: 'aria-controls',
  ariaOwnsElements: 'aria-owns',
};

const ELEMENT_REF_KEYS = new Set<AriaInternalsKey>([
  'ariaActiveDescendantElement',
  'ariaControlsElements',
  'ariaOwnsElements',
]);

let _supportsInternalsAriaReflection: boolean | undefined;
function supportsInternalsAriaReflection(): boolean {
  if (_supportsInternalsAriaReflection !== undefined) return _supportsInternalsAriaReflection;
  if (typeof document === 'undefined' || typeof HTMLElement === 'undefined' || !('attachInternals' in HTMLElement.prototype)) {
    _supportsInternalsAriaReflection = false;
    return false;
  }
  try {
    const probe = document.createElement('div') as HTMLElement & {
      attachInternals?: () => ElementInternals;
    };
    if (!('attachInternals' in probe)) {
      _supportsInternalsAriaReflection = false;
      return false;
    }
    const internals = (probe as any).attachInternals?.();
    _supportsInternalsAriaReflection = internals != null && 'role' in internals;
    return _supportsInternalsAriaReflection;
  } catch {
    _supportsInternalsAriaReflection = false;
    return false;
  }
}

export function setAriaProperty(
  host: HTMLElement,
  internals: ElementInternals,
  key: AriaInternalsKey,
  value: string | boolean | null | Element | Element[],
): void {
  const attr = KEY_TO_ATTR[key];

  if (supportsInternalsAriaReflection() && !ELEMENT_REF_KEYS.has(key)) {
    try {
      (internals as any)[key] = value;
    } catch {
      // fall through to attribute fallback
    }
  }

  if (value == null || value === false) {
    host.removeAttribute(attr);
    return;
  }

  if (Array.isArray(value)) {
    const ids = value.map((el) => el.id).filter(Boolean).join(' ');
    if (ids) host.setAttribute(attr, ids);
    else host.removeAttribute(attr);
    return;
  }

  if (value instanceof Element) {
    if (value.id) host.setAttribute(attr, value.id);
    else host.removeAttribute(attr);
    return;
  }

  if (value === true) {
    host.setAttribute(attr, 'true');
    return;
  }

  host.setAttribute(attr, String(value));
}

export function setRole(host: HTMLElement, internals: ElementInternals, role: string | null): void {
  setAriaProperty(host, internals, 'role', role);
}

export const __testing__ = { supportsInternalsAriaReflection };

if (typeof document !== 'undefined' && typeof HTMLElement !== 'undefined') {
  // Touch the function once so cached result reflects the real environment.
  void supportsInternalsAriaReflection();
}
