import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeaderIndicator } from './header.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  @Input({ required: true }) title!: string;
  @Input() indicators: HeaderIndicator[] = [];
}
