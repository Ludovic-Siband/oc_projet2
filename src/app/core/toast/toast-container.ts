import { Component } from '@angular/core';
import { NgForOf, NgClass } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastModel } from './toast.model';

/**
 * Displays all active toasts from ToastService.
 * This component should be placed once at the root of the application.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgForOf, NgClass],
  template: `
    <div class="toast-container">
      <div
        class="toast"
        *ngFor="let toast of toasts()"
        [ngClass]="toast.type"
        (click)="dismiss(toast)"
      >
        {{ toast.message }}
      </div>
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
