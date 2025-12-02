import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs';


import { PieChart } from 'src/app/shared/components/pie-chart/pie-chart';
import { Olympic } from 'src/app/shared/models/olympic.model';
import { OlympicDataService } from 'src/app/shared/services/olympic-data.service';
import { ToastService } from 'src/app/core/toast/toast.service';
import { HeaderService } from 'src/app/core/layout/header/header.service';
import { HeaderIndicator } from 'src/app/core/layout/header/header.model';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [PieChart],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Home implements OnInit {
  readonly titlePage = 'Medals per Country';

  private readonly countriesSignal = signal<Olympic[]>([]);

  readonly isLoading = signal(true);

  readonly totalCountries = computed(() => this.countriesSignal().length);

  readonly totalJOs = computed(() => {
    const years = new Set<number>();
    this.countriesSignal().forEach((country) =>
      country.participations.forEach((p) => years.add(p.year))
    );
    return years.size;
  });

  readonly chartLabels = computed(() =>
    this.countriesSignal().map((c) => c.country)
  );

  readonly chartValues = computed(() =>
    this.countriesSignal().map((c) =>
      c.participations.reduce((sum, p) => sum + p.medalsCount, 0)
    )
  );

  readonly countriesTable = computed(() =>
    this.countriesSignal().map((c) => ({
      country: c.country,
      totalMedals: c.participations.reduce((sum, p) => sum + p.medalsCount, 0),
    }))
  );

  private readonly router = inject(Router);
  private readonly olympicDataService = inject(OlympicDataService);
  private readonly toastService = inject(ToastService);
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.updateHeader();

    this.olympicDataService
      .getCountries$()
      .pipe(take(1))
      .subscribe({
        next: (countries) => {
          this.countriesSignal.set(countries);
          this.updateHeader();
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.toastService.showError(
            'An error occurred while loading olympic data.',
            6000);
        },
      });
  }

  onCountrySelected(event: string | Event): void {
    const country = typeof event === 'string' ? event : undefined;

    if (!country) {
      return;
    }

    this.router.navigate([
      'country',
      this.olympicDataService.toCountrySlug(country),
    ]);
  }

  private updateHeader(): void {
    const indicators: HeaderIndicator[] = [
      {
        label: 'Number of countries',
        value: this.totalCountries()
      },
      {
        label: 'Total Olympic Games',
        value: this.totalJOs()
      }
    ];

    this.headerService.setHeader({
      title: this.titlePage,
      indicators
    });
  }
}