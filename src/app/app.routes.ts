import { Routes } from '@angular/router'
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { CountryDetail } from "./pages/country-detail/country-detail";

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'country/:id',
    component: CountryDetail,
  },
  {
    path: '**',
    component: NotFound,
  },
];