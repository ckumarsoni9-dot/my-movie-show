import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { MoviesService } from '../core/movies.service';
import { Movie } from '../core/movie.model';
import { MovieFormComponent } from './movie-form.component';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [MovieFormComponent],
  template: `
    <pre>
Admin Dashboard

<button (click)="logout()">Logout</button>

<h3>Add Movie</h3>
<movie-form (save)="addMovie($event)"></movie-form>

<h3>Movies List</h3>
<ul>
  <li *ngFor="let movie of movies()">
    <b>{{ movie.title }}</b>
    <button (click)="editMovie(movie)">Edit</button>
    <button (click)="deleteMovie(movie.id)">Delete</button>
    <div *ngIf="editingId === movie.id">
      <movie-form [movie]="movie" (save)="updateMovie(movie.id, $event)" (cancel)="cancelEdit()"></movie-form>
    </div>
    <div>{{ movie.description }}</div>
    <div>YouTube ID: {{ movie.youtubeId }}</div>
  </li>
</ul>
    </pre>
  `
})
export class AdminDashboardComponent {
  movies = this.moviesService.movies;
  editingId: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin']);
  }

  addMovie(movie: Omit<Movie, 'id'>) {
    this.moviesService.addMovie(movie);
  }

  editMovie(movie: Movie) {
    this.editingId = movie.id;
  }

  updateMovie(id: number, changes: Omit<Movie, 'id'>) {
    this.moviesService.updateMovie(id, changes);
    this.editingId = null;
  }

  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id);
    if (this.editingId === id) this.editingId = null;
  }

  cancelEdit() {
    this.editingId = null;
  }
}