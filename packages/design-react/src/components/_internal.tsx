import * as React from 'react';

export const spacing = {
  '0': '0',
  '0_5': 'var(--vds-spacing-0_5)',
  '1': 'var(--vds-spacing-1)',
  '1_5': 'var(--vds-spacing-1_5)',
  '2': 'var(--vds-spacing-2)',
  '2_5': 'var(--vds-spacing-2_5)',
  '3': 'var(--vds-spacing-3)',
  '4': 'var(--vds-spacing-4)',
  '5': 'var(--vds-spacing-5)',
  '6': 'var(--vds-spacing-6)',
  '8': 'var(--vds-spacing-8)',
  '10': 'var(--vds-spacing-10)',
  '12': 'var(--vds-spacing-12)',
  '16': 'var(--vds-spacing-16)',
} as const;

export function cx(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(' ');
}

export function toDataAttr(value: boolean | undefined) {
  return value ? '' : undefined;
}

export function mergeRefs<T>(
  forwarded: React.ForwardedRef<T>,
  value: T | null,
) {
  if (typeof forwarded === 'function') forwarded(value);
  else if (forwarded) (forwarded as React.MutableRefObject<T | null>).current = value;
}

export function extractSlottedChildren(
  children: React.ReactNode,
  slotName: string,
) {
  const slotted: React.ReactNode[] = [];
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'slot' in child.props &&
      child.props.slot === slotName
    ) {
      slotted.push(child);
      return;
    }
    rest.push(child);
  });

  return { slotted, rest };
}

export const focusRing: React.CSSProperties = {
  outline: '2px solid var(--vds-theme-border-focus)',
  outlineOffset: '2px',
};
