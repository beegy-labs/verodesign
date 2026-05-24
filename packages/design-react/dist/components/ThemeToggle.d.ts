export type ThemeMode = 'auto' | 'light' | 'dark';
export interface ThemeToggleProps {
    value: ThemeMode;
    onChange: (mode: ThemeMode) => void;
    compact?: boolean;
    size?: 'sm' | 'md';
    className?: string;
}
export declare function ThemeToggle({ value, onChange, compact, size, className, }: ThemeToggleProps): import("react/jsx-runtime").JSX.Element;
