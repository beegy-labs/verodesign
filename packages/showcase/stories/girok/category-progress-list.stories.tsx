import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("category-progress-list");
export default meta;
type Story = StoryObj<typeof meta>;
const rows = [["식비","is-rose","420,000원","36%","36%"],["교통","is-amber","121,000원","14%","14%"],["구독","is-info","84,000원","9%","9%"],["기타","is-neutral","52,000원","6%","6%"]] as const;
export const Default: Story = { render: () => <Shell phone><section className="vds-pattern-girok-category-progress-list">{rows.map(([name,tone,amount,percent,width])=><div key={name} className="vds-pattern-girok-category-progress-list__row"><div className="vds-pattern-girok-category-progress-list__head"><span className="vds-pattern-girok-category-progress-list__name"><span className={`vds-pattern-girok-category-progress-list__dot ${tone}`} />{name}</span><span className="vds-pattern-girok-category-progress-list__amount">{amount}<span className="vds-pattern-girok-category-progress-list__percent">{percent}</span></span></div><div className="vds-pattern-girok-category-progress-list__track"><div className={`vds-pattern-girok-category-progress-list__fill ${tone}`} style={{ width }} /></div></div>)}</section></Shell> };
