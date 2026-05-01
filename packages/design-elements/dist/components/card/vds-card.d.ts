import { LitElement } from 'lit';
type Elevation = '0' | '1' | '2' | '3' | '4' | '5';
type Variant = 'surface' | 'outline' | 'ghost';
/**
 * <vds-card> — surface container with optional elevation and structured slots.
 *
 * @slot - main body content
 * @slot header - top header content
 * @slot footer - bottom footer content
 */
export declare class VdsCard extends LitElement {
    static styles: import("lit").CSSResult;
    variant: Variant;
    elevation: Elevation;
    connectedCallback(): void;
    protected updated(changed: Map<string, unknown>): void;
    render(): import("lit").TemplateResult<1>;
}
export {};
