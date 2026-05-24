import * as React from 'react';

export interface SettingsRowProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'zinc';
  title: string;
  description?: string;
  descriptionTone?: 'default' | 'success' | 'warning' | 'destructive';
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
}

type VdsSettingsRowEl = HTMLElement & {
  rowLabel: string;
  description: string;
  descriptionTone: 'default' | 'success' | 'warning' | 'destructive';
  tone: SettingsRowProps['tone'];
  chevron: boolean;
};

export const SettingsRow = React.forwardRef<HTMLElement, SettingsRowProps>(function SettingsRow(
  {
    tone = 'zinc',
    title,
    description,
    descriptionTone = 'default',
    leading,
    trailing,
    chevron = false,
    className,
    children: _children,
    ...rest
  },
  ref,
) {
  const innerRef = React.useRef<HTMLElement | null>(null);

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [ref],
  );

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.setAttribute('tone', tone);
    el.setAttribute('row-label', title);
    if (description) {
      el.setAttribute('description', description);
    } else {
      el.removeAttribute('description');
    }
    el.setAttribute('description-tone', descriptionTone);
    if (chevron) {
      el.setAttribute('chevron', '');
    } else {
      el.removeAttribute('chevron');
    }
  }, [tone, title, description, descriptionTone, chevron]);

  return React.createElement(
    'vds-settings-row',
    {
      ...rest,
      ref: setRef,
      class: className,
    },
    leading ? React.createElement('span', { slot: 'leading' }, leading) : null,
    trailing ? React.createElement('span', { slot: 'trailing' }, trailing) : null,
  );
});
