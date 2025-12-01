import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from 'src/app/core/layout/header/header.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound implements OnInit {
  readonly titlePage = 'Page not found';

  private readonly headerService = inject(HeaderService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.headerService.setHeader({
      title: this.titlePage,
      indicators: [],
    });
  }

  onBackToHome(): void {
  this.router.navigate(['/']);
  }
}
