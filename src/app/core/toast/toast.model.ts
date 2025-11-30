export type ToastType = 'info' | 'success' | 'error';

export interface ToastModel {
    id: number;
    message: string;
    type: ToastType;
}
