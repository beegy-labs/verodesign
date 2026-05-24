import type { StoryObj } from "@storybook/react-vite";
import { Shell, sectionMeta } from "./storybook-helpers";
const meta = sectionMeta("calendar");
export default meta;
type Story = StoryObj<typeof meta>;
const days = ["월","화","수","목","금","토","일"];
const dates = [26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
export const Default: Story = { render: () => <Shell phone><section className="vds-pattern-girok-calendar"><div className="vds-pattern-girok-calendar__weekdays">{days.map((day,i)=><span key={day} className={`vds-pattern-girok-calendar__weekday ${i===5?"is-saturday":i===6?"is-sunday":""}`}>{day}</span>)}</div><div className="vds-pattern-girok-calendar__grid">{dates.map((date)=><button key={date} className={`vds-pattern-girok-calendar__cell is-day ${date===24?"is-today":""}`}><span className="vds-pattern-girok-calendar__date">{date}</span>{[3,7,14,24].includes(date)?<span className="vds-pattern-girok-calendar__dot" />:null}</button>)}</div></section></Shell> };
