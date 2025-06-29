import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/**
 * MoviesListComponent
 * -------------------
 * Stand-alone component that:
 * 1. Fetches English-language **Animation** movies from TMDb (genre 16).
 * 2. Renders them in a responsive PrimeNG + Tailwind grid.
 * 3. Performs infinite scrolling via IntersectionObserver.
 * 4. Shows per-poster spinners while images load and a fallback placeholder on error.
 */
@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
  ],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent implements OnInit, AfterViewInit, OnDestroy {
  // ---------------------------------------------------------------------------
  // Template references
  // ---------------------------------------------------------------------------

  /** Sentinel element that triggers next-page fetch when intersecting viewport */
  @ViewChild('sentinel', { static: false })
  private sentinel!: ElementRef<HTMLElement>;

  // ---------------------------------------------------------------------------
  // Reactive state
  // ---------------------------------------------------------------------------

  /** Aggregated movie list rendered in the grid */
  movies: Array<any & { posterLoaded?: boolean }> = [];

  /** Current TMDb page (1-based) already loaded */
  currentPage = 1;

  /** Flag: an HTTP fetch is currently in flight */
  isLoading = false;

  /** Flag: first page still loading (hides infinite-scroll spinner) */
  initialLoad = true;

  // ---------------------------------------------------------------------------
  // DI services
  // ---------------------------------------------------------------------------

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  private readonly apiKey = '2a3ba92b014fdf4444d75d37a0ba631c';
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly fallbackPoster = 'assets/images/broken-poster.jpg';

  // ---------------------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------------------

  /** IntersectionObserver instance (undefined on SSR) */
  private io?: IntersectionObserver;

  // ---------------------------------------------------------------------------
  // Angular lifecycle
  // ---------------------------------------------------------------------------

  /** Kick off the initial fetch */
  ngOnInit(): void {
    this.loadMovies();
  }

  /** Attach IntersectionObserver once view / sentinel exist */
  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return; // SSR safety guard
    }

    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.isLoading) {
          this.io!.unobserve(this.sentinel.nativeElement); // pause
          this.loadMovies(this.currentPage + 1).finally(
            () => this.io!.observe(this.sentinel.nativeElement) // resume
          );
        }
      },
      {
        root: null, // viewport
        rootMargin: '300px', // pre-load 300 px before bottom
        threshold: 0.1,
      }
    );

    this.io.observe(this.sentinel.nativeElement);
  }

  /** Clean up observer to avoid memory leaks on route change */
  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  // ---------------------------------------------------------------------------
  // Public API for template
  // ---------------------------------------------------------------------------

  /**
   * Navigate to the movie-details route.
   * @param id TMDb movie ID
   */
  goToDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  /**
   * Fetch one page of English Animation movies from TMDb and append to grid.
   * @param page 1-based TMDb page (defaults to 1)
   * @returns Promise resolved when HTTP request completes
   */
  loadMovies(page = 1): Promise<void> {
    this.isLoading = true;

    const url =
      `${this.baseUrl}/discover/movie` +
      `?api_key=${this.apiKey}` +
      `&language=en-US` + // response strings in English
      `&sort_by=popularity.desc` + // order by popularity
      `&with_original_language=en` + // English originals only
      `&with_genres=16` + // Animation genre
      `&include_adult=false` +
      `&page=${page}`;

    return this.http
      .get<{ results: any[] }>(url)
      .toPromise()
      .then((res) => {
        // Attach posterLoaded flag to each movie
        this.movies.push(
          ...res!.results.map((m) => ({ ...m, posterLoaded: false }))
        );
        this.currentPage = page;
        this.initialLoad = false;
      })
      .catch((err) => console.error('TMDb fetch error:', err))
      .finally(() => (this.isLoading = false));
  }

  /**
   * Image error handler — swaps in a placeholder and hides its spinner.
   * @param evt native error event from <img>
   * @param movie reference to the movie object for spinner flag
   */
  onPosterError(evt: Event, movie: any): void {
    movie.posterLoaded = true; // stop spinner
    const img = evt.target as HTMLImageElement;
    img.onerror = null; // prevent loops if placeholder fails
    img.src = this.fallbackPoster; // show local placeholder
  }
}
