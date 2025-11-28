import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { ToastModel, ToastType } from './toast.model';

/**
 * Simple toast service.
 * Responsible for managing the list of active toasts.
 */
@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private readonly _toasts = signal<ToastModel[]>([]);

    /**
     * Exposed read-only signal of active toasts.
     */
    readonly toasts = this._toasts.asReadonly();

    /**
     * Displays a toast with the given message and type.
     * The toast is automatically removed after the given duration.
     */
    show(message: string, type: ToastType = 'info', durationMs = 3000): void {
        const id = Date.now() + Math.random();
        const toast: ToastModel = { id, message, type };

        this._toasts.update((current) => [...current, toast]);

        setTimeout(() => {
            this.remove(id);
        }, durationMs);
    }

    showInfo(message: string, durationMs = 3000): void {
        this.show(message, 'info', durationMs);
    }

    showSuccess(message: string, durationMs = 3000): void {
        this.show(message, 'success', durationMs);
    }

    showError(message: string, durationMs = 3000): void {
        this.show(message, 'error', durationMs);
    }

    remove(id: number): void {
        this._toasts.update((current) => current.filter((t) => t.id !== id));
    }
}
