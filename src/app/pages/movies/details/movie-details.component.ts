import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../../../movie.service';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';
import { HttpClientModule } from '@angular/common/http';

/**
 * @component MovieDetailsComponent
 * @description
 * Standalone Angular component that displays details (e.g., trailer) for a specific movie.
 * It reads the movie ID from the route parameters and fetches the corresponding trailer key using the MovieService.
 */
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, SafePipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  /**
   * YouTube trailer video key for the selected movie.
   * This is used to embed the video using a secure iframe URL.
   */
  trailerKey: string | null = null;

  /**
   * @constructor
   * @param route ActivatedRoute - Injected service to access current route parameters.
   * @param movieService MovieService - Service to fetch movie-related data.
   */
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  /**
   * @lifecycle ngOnInit
   * @description
   * Angular lifecycle hook that runs on component initialization.
   * Retrieves the `id` parameter from the route and fetches the corresponding trailer key.
   */
  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieTrailer(movieId).subscribe((key) => {
      this.trailerKey = key;
    });
  }
}
