import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = '2a3ba92b014fdf4444d75d37a0ba631c';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovieTrailer(movieId: string): Observable<string | null> {
    return this.http
      .get<any>(
        `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`
      )
      .pipe(
        map((response) => {
          const trailer = response.results.find(
            (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          return trailer ? trailer.key : null;
        })
      );
  }

  // getAllIds(): Promise<string[]> {
  //   const apiUrl = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
  //   return this.http
  //     .get<any>(apiUrl)
  //     .toPromise()
  //     .then((response) => {
  //       return response.results.map((movie: any) => movie.id.toString());
  //     });
  // }

  getAllIds(): Promise<string[]> {
    return this.http
      .get<any>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`)
      .toPromise()
      .then((res) => res.results.map((movie: any) => movie.id.toString()));
  }
}
