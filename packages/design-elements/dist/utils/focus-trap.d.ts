export declare class FocusTrap {
    private root;
    private previousActive;
    private active;
    constructor(root: HTMLElement);
    activate(initialFocus?: HTMLElement | null): void;
    deactivate(): void;
    private handleKeydown;
    private handleFocusIn;
    private composedActiveElement;
}
