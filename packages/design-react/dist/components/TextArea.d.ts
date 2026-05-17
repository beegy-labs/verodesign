import * as React from 'react';
export type TextAreaInputEvent = CustomEvent<{
    value: string;
}>;
export type TextAreaChangeEvent = CustomEvent<{
    value: string;
}>;
type Resize = 'none' | 'vertical' | 'horizontal' | 'both';
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'onInput' | 'onChange'> {
    label?: string;
    helper?: string;
    errorMessage?: string;
    resize?: Resize;
    rows?: number;
    showCount?: boolean;
    'show-count'?: boolean;
    onInput?: ((event: TextAreaInputEvent) => void) | undefined;
    onChange?: ((event: TextAreaChangeEvent) => void) | undefined;
}
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;
export {};
