import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsSpacer } from '@verobee/design-elements/components/spacer';
import '@verobee/design-elements/define/spacer';

export const Spacer = /*#__PURE__*/ createComponent({
  tagName: 'vds-spacer',
  elementClass: VdsSpacer,
  react: React,
});

export type SpacerProps = React.ComponentProps<typeof Spacer>;
