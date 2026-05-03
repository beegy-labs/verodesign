import { LitElement, type PropertyValues } from 'lit';
export declare class VdsElement extends LitElement {
    static formAssociated: boolean;
    protected emit<T>(name: string, detail?: T, options?: EventInit): boolean;
    protected updated(changed: PropertyValues): void;
    protected createId(prefix: string): string;
    protected renderSr(text: string): import("lit").TemplateResult<1>;
}
