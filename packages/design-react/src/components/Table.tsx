import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsTable } from '@verobee/design-elements/components/table';
import '@verobee/design-elements/define/table';

export const Table = createComponent({
  tagName: 'vds-table',
  elementClass: VdsTable,
  react: React,
});

export type TableProps = React.ComponentProps<typeof Table>;
