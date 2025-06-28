import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';

/**
 * @component MoviesListComponent
 * @description
 * Displays a list of popular movies fetched from TheMovieDB API.
 * Handles navigation to movie details and supports infinite scrolling.
 */
@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent implements OnInit {
  /** Array to store list of movies fetched from API */
  movies: any[] = [];

  /** Current page of results being fetched */
  currentPage = 1;

  /** Flag to indicate loading state */
  isLoading = false;

  /** The API key for TheMovieDB */
  private apiKey = '2a3ba92b014fdf4444d75d37a0ba631c';

  /** Base URL for TheMovieDB API */
  private baseUrl = 'https://api.themoviedb.org/3';

  /**
   * @constructor
   * @param http HttpClient for making API requests
   * @param router Router service for navigating to other components
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * @lifecycle ngOnInit
   * Angular lifecycle hook that initializes the component.
   * Automatically loads the first page of movies.
   */
  ngOnInit(): void {
    console.log('MoviesListComponent initialized');
    console.log('[Hydrated] MoviesListComponent'); // Used for hydration diagnostics
    this.loadMovies(); // Load first page
  }

  /**
   * @method goToDetails
   * @param movieId number - ID of the movie to show details for
   * @description Navigates the user to the movie details page.
   */
  goToDetails(movieId: number): void {
    console.log(`🎬 Navigating to movie details with ID: ${movieId}`);
    this.router.navigate(['/movie', movieId]);
  }

  /**
   * @method loadMovies
   * @param page number - (optional) The page of results to load, defaults to 1
   * @description Fetches a page of popular movies from TheMovieDB API and appends it to the list.
   */
  loadMovies(page = 1): void {
    this.isLoading = true;
    this.http
      .get<any>(
        `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`
      )
      .subscribe({
        next: (res) => {
          this.movies.push(...res.results);
          this.currentPage = page;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('❌ Error:', err);
          this.isLoading = false;
        },
      });
  }
}
