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
import { SafePipe } from '../safe.pipe';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

/**
 * @component MoviesListComponent
 * Displays a paginated TMDb list and auto-loads the next page
 * when the sentinel element becomes visible (IntersectionObserver).
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
  ],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent implements OnInit, AfterViewInit, OnDestroy {
  /** DOM element that triggers next-page load */
  @ViewChild('scrollAnchor', { static: true })
  anchor!: ElementRef<HTMLElement>;

  /** Fetched movie list */
  movies: any[] = [];

  /** Current TMDb page */
  currentPage = 1;

  /** True while API call in flight */
  isLoading = false;

  /** True only for the very first fetch (used to hide spinner) */
  initialLoad = true;

  /* Services */
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiKey = '2a3ba92b014fdf4444d75d37a0ba631c';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  /** Initial fetch */
  ngOnInit(): void {
    this.loadMovies();
  }

  @ViewChild('sentinel', { static: false }) sentinel!: ElementRef<HTMLElement>;

  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return; // SSR safety guard
    }

    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.isLoading) {
          // Pause observing while we fetch, then resume
          this.io!.unobserve(this.sentinel.nativeElement);
          this.loadMovies(this.currentPage + 1).finally(() => {
            this.io!.observe(this.sentinel.nativeElement);
          });
        }
      },
      {
        root: null, // viewport
        rootMargin: '300px', // start loading a bit early
        threshold: 0.1,
      }
    );

    // Attach once view is fully initialised
    this.io.observe(this.sentinel.nativeElement);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  /**
   * Navigate to movie detail screen.
   * @param id TMDb movie ID
   */
  goToDetails(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  /**
   * Fetches a TMDb ‘popular’ page and appends results.
   * @param page Which TMDb page (defaults to 1)
   */
  /** Returns a Promise so we can await load-completion in the observer */
  loadMovies(page = 1): Promise<void> {
    this.isLoading = true;

    // const url =
    //   `${this.baseUrl}/discover/movie` +
    //   `?api_key=${this.apiKey}` +
    //   // `&language=ar` +
    //   `&language=en` +
    //   `&sort_by=popularity.desc` +
    //   `&with_original_language=ar` +
    //   // `&with_genres=16` +
    //   `&include_adult=false` +
    //   `&page=${page}`;

    const url =
      `${this.baseUrl}/discover/movie` +
      `?api_key=${this.apiKey}` +
      `&language=en-US` + // API response strings in English
      `&sort_by=popularity.desc` + // or vote_average.desc, etc.
      `&with_original_language=en` + // filter: originals in English
      `&with_genres=16` + // filter: Animation genre
      `&include_adult=false` +
      `&page=${page}`;

    return this.http
      .get<{ results: any[] }>(url)
      .toPromise()
      .then((res) => {
        this.movies.push(
          ...res!.results.map((m) => ({ ...m, posterLoaded: false }))
        );
        this.currentPage = page;
        this.initialLoad = false;
      })
      .catch((err) => console.error(err))
      .finally(() => (this.isLoading = false));
  }

  /** Fallback poster asset (placed under src/assets/) */
  private readonly fallbackPoster = 'assets/images/broken-poster.jpg';

  /** Called when an <img> fails to load */
  onPosterError(evt: Event, movie: any): void {
    movie.posterLoaded = true; // hide spinner
    const img = evt.target as HTMLImageElement;
    img.onerror = null; // avoid loops
    img.src = this.fallbackPoster; // show placeholder
  }
}
