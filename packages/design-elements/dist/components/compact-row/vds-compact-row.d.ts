import { VdsElement } from '../../base/vds-element.js';
type RowAs = 'button' | 'link' | 'div';
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export declare class VdsCompactRow extends VdsElement {
    static styles: import("lit").CSSResult;
    as: RowAs;
    href: string | null;
    tone: Tone;
    selected: boolean;
    disabled: boolean;
    showChevron: boolean;
    protected updated(): void;
    private renderTag;
    private renderContent;
    render(): import("lit").TemplateResult<1>;
}
export {};
