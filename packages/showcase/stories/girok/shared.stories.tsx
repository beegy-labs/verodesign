import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("shared");
export default meta;
type Story = StoryObj<typeof meta>;
export const Backdrop: Story = { render: () => <Shell phone><div className="girok-story-bottomsheet-stage"><div className="vds-pattern-bottomsheet__backdrop" /></div></Shell> };
