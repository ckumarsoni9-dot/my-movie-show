import { Component } from '@angular/core';
import { MoviesService } from '../core/movies.service';
import { MoviePlayerComponent } from './movie-player.component';

@Component({
  selector: 'movie-list',
  standalone: true,
  imports: [MoviePlayerComponent],
  template: `
    <pre>
Movies List

<ul>
  <li *ngFor="let movie of movies()">
    <b>{{ movie.title }}</b>
    <div>{{ movie.description }}</div>
    <movie-player [youtubeId]="movie.youtubeId"></movie-player>
  </li>
</ul>
    </pre>
  `
})
export class MovieListComponent {
  movies = this.moviesService.movies;

  constructor(private moviesService: MoviesService) {}
}