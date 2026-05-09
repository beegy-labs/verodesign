import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsPageHeader } from '@verobee/design-elements/components/page-header';
import '@verobee/design-elements/define/page-header';

export const PageHeader = /*#__PURE__*/ createComponent({
  tagName: 'vds-page-header',
  elementClass: VdsPageHeader,
  react: React,
});

export type PageHeaderProps = React.ComponentProps<typeof PageHeader>;
