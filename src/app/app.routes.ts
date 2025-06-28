import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MovieDetailsComponent } from './pages/movies/details/movie-details.component';
import { MoviesListComponent } from './pages/movies/list/movies-list.component';

/**
 * Application routes configuration.
 *
 * @type {Routes}
 * @description Defines the routing table used by Angular Router to determine which component to display based on the current URL.
 */
export const routes: Routes = [
  /**
   * Route to display the list of movies.
   * @path /movies
   */
  { path: 'movies', component: MoviesListComponent },

  /**
   * Lazy-loaded route for displaying a movie's details.
   * @path /movie/:id
   * @param {string} id - The ID of the movie.
   */
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./pages/movies/details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },

  /**
   * Redirect root path to /movies.
   * @path /
   */
  { path: '', redirectTo: 'movies', pathMatch: 'full' },

  /**
   * Wildcard fallback route - redirect to /movies for any undefined paths.
   * @path ** (fallback)
   */
  { path: '**', redirectTo: 'movies' },

  /**
   * Route to the About page.
   * @path /about
   */
  { path: 'about', component: AboutComponent },

  /**
   * Route to the Contact page.
   * @path /contact
   */
  { path: 'contact', component: ContactComponent },
];
