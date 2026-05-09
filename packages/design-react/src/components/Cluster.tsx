import * as React from 'react';
import { createComponent } from '@lit/react';
import { VdsCluster } from '@verobee/design-elements/components/cluster';
import '@verobee/design-elements/define/cluster';

export const Cluster = /*#__PURE__*/ createComponent({
  tagName: 'vds-cluster',
  elementClass: VdsCluster,
  react: React,
});

export type ClusterProps = React.ComponentProps<typeof Cluster>;
