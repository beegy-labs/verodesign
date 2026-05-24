import type { StoryObj } from "@storybook/react-vite";
import { Icon, Shell, paths, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("view-toggle");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><div className="vds-pattern-girok-view-toggle"><button className="vds-pattern-girok-view-toggle__item is-active"><Icon path={paths.grid} /></button><button className="vds-pattern-girok-view-toggle__item"><Icon path={paths.list} /></button></div></Shell> };
