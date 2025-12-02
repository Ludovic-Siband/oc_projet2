import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { OlympicDataService } from '../../shared/services/olympic-data.service';
import { Olympic } from '../../shared/models/olympic.model';
import { LineChart } from '../../shared/components/line-chart/line-chart';
import { ToastService } from '../../core/toast/toast.service';
import { HeaderService } from '../../core/layout/header/header.service';
import { HeaderIndicator } from 'src/app/core/layout/header/header.model';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [LineChart],
  templateUrl: './country-detail.html',
  styleUrls: ['./country-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetail implements OnInit {
  private readonly countrySignal = signal<Olympic | null>(null);

  readonly isLoading = signal(true);

  readonly titlePage = computed(() => this.countrySignal()?.country ?? '');

  readonly totalEntries = computed(
    () => this.countrySignal()?.participations.length ?? 0
  );

  readonly totalMedals = computed(() => {
    const participations = this.countrySignal()?.participations ?? [];
    return participations.reduce((sum, part) => sum + part.medalsCount, 0);
  });

  readonly totalAthletes = computed(() => {
    const participations = this.countrySignal()?.participations ?? [];
    return participations.reduce((sum, part) => sum + part.athleteCount, 0);
  });

  readonly chartYears = computed(() => {
    const participations = this.countrySignal()?.participations ?? [];
    return participations.map((p) => p.year);
  });

  readonly chartMedals = computed(() => {
    const participations = this.countrySignal()?.participations ?? [];
    return participations.map((p) => p.medalsCount);
  });

  readonly participationTable = computed(() =>
    (this.countrySignal()?.participations ?? []).map((p) => ({
      year: p.year,
      medals: p.medalsCount,
      athletes: p.athleteCount,
    }))
  );

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly olympicDataService = inject(OlympicDataService);
  private readonly toastService = inject(ToastService);
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    this.olympicDataService
      .getCountryByIdOrSlug$(idParam!)
      .pipe(take(1))
      .subscribe({
        next: (country) => {
          if (!country) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.countrySignal.set(country);
          this.updateHeader();
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.toastService.showError(
            'An error occurred while loading country data.',
            6000
          );
        },
      });
  }

  private updateHeader(): void {
    const indicators: HeaderIndicator[] = [
      { label: 'Participations', value: this.totalEntries() },
      { label: 'Total medals', value: this.totalMedals() },
      { label: 'Athletes', value: this.totalAthletes() },
    ];

    this.headerService.setHeader({
      title: this.titlePage(),
      indicators,
    });
  }

  onBackToHome(): void {
    this.router.navigate(['/']);
  }
}