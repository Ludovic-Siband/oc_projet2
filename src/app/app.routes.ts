import { Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home';
import { NotFoundComponent } from './pages/not-found/not-found';
import { CountryComponent } from "./pages/country/country";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'country/:countryName',
    component: CountryComponent
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
