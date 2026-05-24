import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("fx-history-card");
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Shell phone><div className="girok-story-stack"><article className="vds-pattern-girok-fx-history-card"><div className="vds-pattern-girok-fx-history-card__leading"><strong className="vds-pattern-girok-fx-history-card__title">USD 매수</strong><span className="vds-pattern-girok-fx-history-card__label">2026.05.23</span></div><div className="vds-pattern-girok-fx-history-card__trailing"><strong className="vds-pattern-girok-fx-history-card__amount">$1,200.00</strong><span className="vds-pattern-girok-fx-history-card__profit">+42,100원</span></div></article></div></Shell> };
