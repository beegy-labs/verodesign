import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("month-pill");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><button className="vds-pattern-girok-month-pill"><span className="vds-pattern-girok-month-pill__chevron">‹</span><span className="vds-pattern-girok-month-pill__label">2026년 5월</span><span className="vds-pattern-girok-month-pill__chevron">›</span></button></Shell> };
