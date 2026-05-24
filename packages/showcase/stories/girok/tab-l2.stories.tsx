import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("tab-l2");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><div className="vds-pattern-girok-tab-l2"><span className="vds-pattern-girok-tab-l2__indicator" /><button className="vds-pattern-girok-tab-l2__cell is-active">월</button><button className="vds-pattern-girok-tab-l2__cell">분기</button><button className="vds-pattern-girok-tab-l2__cell">연</button></div></Shell> };
