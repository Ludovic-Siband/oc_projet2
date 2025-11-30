import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastModel } from './toast.model';

/**
 * Displays all active toasts from ToastService.
 * This component should be placed once at the root of the application.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
 <div class="toast-container">
      @for (toast of toasts(); track toast.id) {
        <div
          class="toast"
          [class]="toast.type"
          (click)="dismiss(toast)"
        >
          {{ toast.message }}
        </div>
      }
    </div>
  `,
  styleUrls: ['./toast-container.scss'],
})
export class ToastContainer {
  readonly toasts = this.toastService.toasts;

  constructor(private readonly toastService: ToastService) { }

  /**
   * Dismisses a toast when user clicks on it.
   */
  dismiss(toast: ToastModel): void {
    this.toastService.remove(toast.id);
  }
}
