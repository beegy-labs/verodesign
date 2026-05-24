import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("select-card");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><label className="vds-pattern-girok-select-card"><span className="vds-pattern-girok-select-card__label">기준 통화</span><select className="vds-pattern-girok-select-card__select" defaultValue="usd"><option value="usd">USD</option><option value="jpy">JPY</option><option value="eur">EUR</option></select></label></Shell> };
