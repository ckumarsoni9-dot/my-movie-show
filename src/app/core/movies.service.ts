import { Injectable, signal } from '@angular/core';
import { Movie } from './movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private _movies = signal<Movie[]>([
    {
      id: 1,
      title: 'Game of Thrones S01E01',
      description: 'Game of Thrones S01E01 720p 10Bit BluRay Hindi ORG 2 0 English HEVC x265 HDHub4u Tv',
      youtubeId: 'JOqn_hXxk5Q'
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