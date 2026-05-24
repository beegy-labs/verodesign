import * as React from 'react';
type Level = '1' | '2' | '3' | '4';
type AsTag = 'h1' | 'h2' | 'h3' | 'h4';
type Tone = 'bright' | 'default' | 'muted';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: Level;
  as?: AsTag;
  tone?: Tone;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = '1', as, tone = 'bright', style, ...rest },
  ref,
) {
  const Tag = (as ?? `h${level}`) as AsTag;
  return (
    <Tag
      {...rest}
      ref={ref}
      style={{
        margin: 0,
        fontFamily: 'var(--vds-font-family-sans)',
        fontWeight: 'var(--vds-type-role-title-weight)',
        lineHeight: 'var(--vds-font-lineheight-snug)',
        fontSize: level === '4' ? 'var(--vds-type-role-label-size)' : level === '3' ? 'var(--vds-type-role-body-size)' : 'var(--vds-type-role-title-size)',
        color: tone === 'muted' ? 'var(--vds-theme-text-secondary)' : tone === 'default' ? 'var(--vds-theme-text-primary)' : 'var(--vds-theme-text-bright)',
        ...style,
      }}
    />
  );
});
