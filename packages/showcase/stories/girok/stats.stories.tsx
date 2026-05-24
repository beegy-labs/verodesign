import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("stats");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><section className="vds-pattern-girok-stats"><div className="vds-pattern-girok-stats__cell"><span className="vds-pattern-girok-stats__label">수입</span><strong className="vds-pattern-girok-stats__value is-income">+2,900,000</strong></div><div className="vds-pattern-girok-stats__cell"><span className="vds-pattern-girok-stats__label">지출</span><strong className="vds-pattern-girok-stats__value is-expense">-1,720,000</strong></div><div className="vds-pattern-girok-stats__cell"><span className="vds-pattern-girok-stats__label">잔액</span><strong className="vds-pattern-girok-stats__value is-remaining">1,180,000</strong></div></section></Shell> };
