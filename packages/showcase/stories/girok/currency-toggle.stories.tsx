import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("currency-toggle");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><div className="vds-pattern-girok-currency-toggle"><div className="vds-pattern-girok-currency-toggle__group"><button className="vds-pattern-girok-currency-toggle__pill is-active">KRW</button><button className="vds-pattern-girok-currency-toggle__pill">USD</button></div></div></Shell> };
