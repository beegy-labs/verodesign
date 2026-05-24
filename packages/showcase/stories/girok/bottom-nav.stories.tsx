import type { StoryObj } from "@storybook/react-vite";
import { Icon, Shell, paths, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("bottom-nav");
export default meta;
type Story = StoryObj<typeof meta>;
const items = [["홈",paths.home,true],["가계부",paths.wallet,false],["자산",paths.chart,false],["알림",paths.bell,false],["설정",paths.settings,false]] as const;
export const Default: Story = { render: () => <Shell phone><nav className="vds-pattern-girok-bottom-nav">{items.map(([label,path,active])=><button key={label} className={`vds-pattern-girok-bottom-nav__item ${active?"is-active":""}`}><Icon path={path} /><span>{label}</span></button>)}</nav></Shell> };
