import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("tab-l1");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><nav className="vds-pattern-girok-tab-l1"><div className="vds-pattern-girok-tab-l1__scroll"><button className="vds-pattern-girok-tab-l1__item is-active">가계부</button><button className="vds-pattern-girok-tab-l1__item">자산</button><button className="vds-pattern-girok-tab-l1__item">부채</button><button className="vds-pattern-girok-tab-l1__item">설정</button></div></nav></Shell> };
