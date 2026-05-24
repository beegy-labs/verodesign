import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("ledger-swapper");
export default meta;
type Story = StoryObj<typeof meta>;
export const Weekdays: Story = { render: () => <Shell phone><div className="vds-pattern-girok-ledger-swapper"><div className="vds-pattern-girok-ledger-swapper__weekday-row">{["월","화","수","목","금","토","일"].map((day,i)=><span key={day} className={`vds-pattern-girok-ledger-swapper__weekday ${i===5?"is-saturday":i===6?"is-sunday":""}`}>{day}</span>)}</div></div></Shell> };
export const Filters: Story = { render: () => <Shell phone><div className="vds-pattern-girok-ledger-swapper"><div className="vds-pattern-girok-ledger-swapper__filter-row"><button className="vds-pattern-girok-ledger-swapper__filter is-active">전체</button><button className="vds-pattern-girok-ledger-swapper__filter">수입</button><button className="vds-pattern-girok-ledger-swapper__filter">지출</button><button className="vds-pattern-girok-ledger-swapper__filter">이체</button></div></div></Shell> };
