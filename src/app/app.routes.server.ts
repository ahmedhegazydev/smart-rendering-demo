import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { MovieService } from '../movie.service';
import { inject, runInInjectionContext } from '@angular/core';

/**
 * @constant serverRoutes
 * @type {ServerRoute[]}
 * @description
 * Defines server-specific route configuration for Angular's Server-Side Rendering (SSR).
 * Each route determines whether it should be prerendered at build time or rendered dynamically at runtime.
 */
export const serverRoutes: ServerRoute[] = [
  {
    /**
     * Route for listing all movies.
     * @path /movies
     * @renderMode Prerender - This page is static and generated at build time.
     */
    path: 'movies',
    renderMode: RenderMode.Prerender,
  },
  {
    /**
     * Route for individual movie details.
     * @path /movie/:id
     * @renderMode Prerender - Each movie page is prerendered using its unique ID.
     * @getPrerenderParams Dynamically generates the list of IDs for which to prerender this route.
     * @fallback Server - If ID is not known during build, render it on-demand at runtime.
     */
    path: 'movie/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const movieService = inject(MovieService);
      const ids = await movieService.getAllIds(); // Fetch all movie IDs to prerender
      return ids.map((id: string) => ({ id }));
    },
    fallback: PrerenderFallback.Server,
  },
  {
    /**
     * Route for the About page.
     * @path /about
     * @renderMode Prerender - Rendered statically at build time.
     */
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    /**
     * Route for the Contact page.
     * @path /contact
     * @renderMode Client - Will be rendered fully on the client (not pre-generated).
     */
    path: 'contact',
    renderMode: RenderMode.Client,
  },
  {
    /**
     * Wildcard fallback route.
     * @path /** (any unmatched path)
     * @renderMode Client - Unknown routes are rendered dynamically on the client.
     */
    path: '**',
    renderMode: RenderMode.Client,
  },
];
