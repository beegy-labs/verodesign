import * as React from 'react';
export interface EntryDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    onConfirm: () => void | Promise<void>;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDisabled?: boolean;
    destructive?: boolean;
}
export declare function EntryDialog({ open, onClose, title, description, children, onConfirm, confirmLabel, cancelLabel, confirmDisabled, destructive, }: EntryDialogProps): React.ReactNode;
