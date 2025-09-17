import { Injectable, signal } from '@angular/core';
import { Movie } from './movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private _movies = signal<Movie[]>([
    {
      id: 1,
      title: 'Game of Thrones Season 5',
      description: 'Game of Thrones Season 5: Episode #9 Clip - Daenerys Escape (HBO)',
      youtubeId: 'G-yYULj7NAU'
    }
  ]);
  private nextId = 2;

  movies = this._movies.asReadonly();

  getMovie(id: number): Movie | undefined {
    return this._movies().find(m => m.id === id);
  }

  addMovie(movie: Omit<Movie, 'id'>) {
    this._movies.update(movies => [
      ...movies,
      { ...movie, id: this.nextId++ }
    ]);
  }

  updateMovie(id: number, changes: Partial<Omit<Movie, 'id'>>) {
    this._movies.update(movies => movies.map(m =>
      m.id === id ? { ...m, ...changes } : m
    ));
  }

  deleteMovie(id: number) {
    this._movies.update(movies => movies.filter(m => m.id !== id));
  }
}