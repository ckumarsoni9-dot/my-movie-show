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
  @for(movie of movies(); track $index)
    {
  <li >
    <b>{{ movie.title }}</b>
    <div>{{ movie.description }}</div>
    <movie-player [youtubeId]="movie.youtubeId"></movie-player>
  </li>
    }

</ul>
    </pre>
  `
})
export class MovieListComponent {
  movies: any;

  constructor(private moviesService: MoviesService) {
    this.movies = this.moviesService.movies;
  }
}