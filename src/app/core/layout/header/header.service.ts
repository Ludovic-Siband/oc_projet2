import { Injectable, signal } from '@angular/core';
import { HeaderConfig } from './header.model';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private readonly _headerConfig = signal<HeaderConfig | null>(null);

  readonly headerConfig = this._headerConfig.asReadonly();

  setHeader(config: HeaderConfig): void {
    this._headerConfig.set(config);
  }

  resetHeader(): void {
    this._headerConfig.set(null);
  }
}
