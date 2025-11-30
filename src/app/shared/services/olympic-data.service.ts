import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}