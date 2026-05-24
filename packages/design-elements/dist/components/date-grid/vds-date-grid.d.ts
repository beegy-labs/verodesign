import { VdsElement } from '../../base/vds-element.js';
type FirstDayOfWeek = 'mon' | 'sun';
export declare class VdsDateGrid extends VdsElement {
    static styles: import("lit").CSSResult;
    year: number;
    month: number;
    selectedDate: string;
    dotDates: string;
    firstDayOfWeek: FirstDayOfWeek;
    private focusedDate;
    private internals;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    private todayIfCurrentMonth;
    private toIso;
    private fromIso;
    private weekendKind;
    private get dotDateSet();
    private get cells();
    private moveFocus;
    private handleKeydown;
    private get prevMonth();
    private get nextMonth();
    private selectDate;
    render(): import("lit").TemplateResult<1>;
}
export {};
