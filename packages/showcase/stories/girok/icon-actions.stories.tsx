import type { StoryObj } from "@storybook/react-vite";
import { Icon, Shell, paths, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("icon-actions");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><div className="vds-pattern-girok-icon-actions"><button className="vds-pattern-girok-icon-button"><Icon path={paths.calendar} /></button><button className="vds-pattern-girok-icon-button"><Icon path={paths.bell} /></button><button className="vds-pattern-girok-icon-button"><Icon path={paths.plus} /></button></div></Shell> };
