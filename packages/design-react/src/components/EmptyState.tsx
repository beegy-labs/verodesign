import * as React from 'react';
import { extractSlottedChildren } from './_internal.js';

type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: EmptyStateSize;
  heading?: string;
  description?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { size = 'md', heading, description, children, style, ...rest },
  ref,
) {
  const { slotted: icon, rest: titleRest } = extractSlottedChildren(children, 'icon');
  const { slotted: descriptionSlot, rest: defaultSlot } = extractSlottedChildren(titleRest, 'description');
  const { slotted: action } = extractSlottedChildren(descriptionSlot.length ? defaultSlot : titleRest, 'action');
  return (
    <div
      {...rest}
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 'var(--vds-spacing-2)',
        paddingBlock: size === 'sm' ? 'var(--vds-spacing-6)' : size === 'lg' ? 'var(--vds-spacing-16)' : 'var(--vds-spacing-10)',
        ...style,
      }}
    >
      <div style={{ color: 'var(--vds-theme-text-faint)' }}>{icon}</div>
      <p style={{ margin: 0, fontSize: 'var(--vds-type-role-label-size)', fontWeight: 'var(--vds-type-role-label-weight)', color: 'var(--vds-theme-text-primary)' }}>{defaultSlot.length ? defaultSlot : heading}</p>
      <p style={{ margin: 0, fontSize: 'var(--vds-type-role-caption-size)', color: 'var(--vds-theme-text-secondary)', maxWidth: 'calc(var(--vds-spacing-64) + var(--vds-spacing-48))' }}>{descriptionSlot.length ? descriptionSlot : description}</p>
      {action.length ? <div style={{ marginTop: 'var(--vds-spacing-3)' }}>{action}</div> : null}
    </div>
  );
});
