import { VdsElement } from '../../base/vds-element.js';
type SettingsTone = 'indigo' | 'emerald' | 'amber' | 'rose' | 'zinc';
type DescriptionTone = 'default' | 'success' | 'warning' | 'destructive';
export declare class VdsSettingsRow extends VdsElement {
    static styles: import("lit").CSSResult;
    tone: SettingsTone;
    rowLabel: string;
    description: string;
    descriptionTone: DescriptionTone;
    chevron: boolean;
    disabled: boolean;
    private internals;
    constructor();
    protected updated(): void;
    private tileVars;
    private handleClick;
    private handleKeydown;
    render(): import("lit").TemplateResult<1>;
}
export {};
