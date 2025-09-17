import { Injectable, signal } from '@angular/core';
import { Movie } from './movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private _movies = signal<Movie[]>([
    {
      id: 1,
      title: 'Sample Movie',
      description: 'This is a sample movie description.',
      youtubeId: 'dQw4w9WgXcQ'
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