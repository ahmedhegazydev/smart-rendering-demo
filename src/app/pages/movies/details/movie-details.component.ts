import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../../../movie.service';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';

/**
 * @component MovieDetailsComponent
 * @description
 * Standalone Angular component that displays detailed information about a movie,
 * including an embedded YouTube trailer. The component fetches the trailer key
 * based on the movie ID extracted from the route parameters.
 */
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SafePipe,
    CardModule,
    SkeletonModule,
    MessageModule,
  ],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  /**
   * The YouTube trailer video key for the selected movie.
   * Used to construct a safe embedded video URL.
   * @type {string | null}
   */
  trailerKey: string | null = null;

  /**
   * Indicates whether the trailer is currently being loaded.
   * Used to control skeleton loading UI.
   * @type {boolean}
   */
  loading: boolean = false;

  /**
   * @constructor
   * @param {ActivatedRoute} route - Angular service for accessing route parameters.
   * @param {MovieService} movieService - Custom service used to fetch movie data from the API.
   */
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * Extracts the `id` from the route parameters and uses it to load the trailer.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loading = true;

    const movieId: string = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieTrailer(movieId).subscribe({
      next: (key: string | null) => {
        this.trailerKey = key;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load trailer key', err);
        this.loading = false;
      },
    });
  }
}
