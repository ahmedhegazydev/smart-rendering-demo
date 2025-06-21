import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MovieDetailsComponent } from './pages/movies/details/movie-details.component';
import { MoviesListComponent } from './pages/movies/list/movies-list.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  {
    path: 'movie/:id',
    // component: MovieDetailsComponent,
    loadComponent: () =>
      import('./pages/movies/details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },

  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', redirectTo: 'movies' }, // optional fallback,
  { path: 'about', component: AboutComponent },
  // { path: 'profile', component: ProfileComponent },
  { path: 'contact', component: ContactComponent },
  // { path: '', redirectTo: 'about', pathMatch: 'full' },
];
