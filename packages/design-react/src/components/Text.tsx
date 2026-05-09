import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsText } from '@verobee/design-elements/components/text';
import '@verobee/design-elements/define/text';

export const Text = /*#__PURE__*/ createComponent({
  tagName: 'vds-text',
  elementClass: VdsText,
  react: React,
});

export type TextProps = React.ComponentProps<typeof Text>;
