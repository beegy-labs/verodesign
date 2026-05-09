import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsHeading } from '@verobee/design-elements/components/heading';
import '@verobee/design-elements/define/heading';

export const Heading = /*#__PURE__*/ createComponent({
  tagName: 'vds-heading',
  elementClass: VdsHeading,
  react: React,
});

export type HeadingProps = React.ComponentProps<typeof Heading>;
