import type { StoryObj } from "@storybook/react-vite";
import { Icon, Shell, paths, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("page-toolbar");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><header className="vds-pattern-girok-page-toolbar"><div className="vds-pattern-girok-page-toolbar__tabs-wrap"><span className="vds-pattern-girok-wordmark">girok<span className="vds-pattern-girok-wordmark__dot">.</span></span></div><div className="vds-pattern-girok-page-toolbar__actions"><button className="vds-pattern-girok-icon-button"><Icon path={paths.bell} /></button><button className="vds-pattern-girok-icon-button"><Icon path={paths.menu} /></button></div></header></Shell> };
