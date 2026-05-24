import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";

const meta = sectionMeta("wordmark");
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Shell phone>
      <span className="vds-pattern-girok-wordmark">
        girok<span className="vds-pattern-girok-wordmark__dot">.</span>
      </span>
    </Shell>
  ),
};
