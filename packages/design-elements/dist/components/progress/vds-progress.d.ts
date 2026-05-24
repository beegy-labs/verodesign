import { VdsElement } from '../../base/vds-element.js';
type ProgressTone = 'primary' | 'success' | 'destructive' | 'warning' | 'neutral';
type ProgressSize = 'sm' | 'md' | 'lg';
export declare class VdsProgress extends VdsElement {
    static styles: import("lit").CSSResult;
    value: number;
    max: number;
    min: number;
    tone: ProgressTone;
    size: ProgressSize;
    indeterminate: boolean;
    ariaLabelText: string | null;
    private internals;
    constructor();
    protected updated(): void;
    private get safeMax();
    private get clampedValue();
    private get ratio();
    private get fillStyle();
    render(): import("lit").TemplateResult<1>;
}
export {};
