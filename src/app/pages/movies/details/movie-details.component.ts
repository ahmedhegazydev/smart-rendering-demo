import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../../../movie.service';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // HttpClientModule,
    SafePipe,
  ],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  trailerKey: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieTrailer(movieId).subscribe((key) => {
      this.trailerKey = key;
    });
  }
}
