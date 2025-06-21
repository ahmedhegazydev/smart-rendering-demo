import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    // HttpClientModule,
    RouterModule,
    // SafePipe,
  ],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  private apiKey = '2a3ba92b014fdf4444d75d37a0ba631c';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('🌀 MoviesListComponent initialized');

    this.http
      .get<any>(
        `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`
      )
      .subscribe({
        next: (response) => {
          console.log('✅ Movies fetched:', response.results);
          this.movies = response.results;
        },
        error: (err) => {
          console.error('❌ Error fetching movies:', err);
        },
      });
  }

  goToDetails(movieId: number): void {
    console.log(`🎬 Navigating to movie details with ID: ${movieId}`);
    this.router.navigate(['/movie', movieId]);
  }
}
