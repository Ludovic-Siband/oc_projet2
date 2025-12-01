import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Olympic } from '../models/olympic.model';

@Injectable({
  providedIn: 'root',
})

export class OlympicDataService {
  private readonly olympicUrl = './assets/mock/olympic.json';

  private http = inject(HttpClient);

  getCountries$(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }

  getCountryByIdOrSlug$(idOrSlug: string): Observable<Olympic | null> {
    return this.getCountries$().pipe(
      map((countries) => {
        const numericId = Number(idOrSlug);

        if (Number.isFinite(numericId)) {
          return countries.find((country) => country.id === numericId) ?? null;
        }

        const slug = this.toCountrySlug(idOrSlug);

        return (
          countries.find(
            (country) => this.toCountrySlug(country.country) === slug
          ) ?? null
        );
      })
    );
  }

  toCountrySlug(name: string): string {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-');
  }
}