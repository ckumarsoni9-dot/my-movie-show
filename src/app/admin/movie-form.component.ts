import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Movie } from '../core/movie.model';

@Component({
  selector: 'movie-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Title: <input formControlName="title" /></label><br />
      <label>Description: <textarea formControlName="description"></textarea></label><br />
      <label>YouTube ID: <input formControlName="youtubeId" /></label><br />
      <button type="submit">Save</button>
      @if(movie){<button type="button"  (click)="cancel.emit()">Cancel</button>}
      
    </form>
  `
})
export class MovieFormComponent {
  @Input() movie?: Movie;
  @Output() save = new EventEmitter<Omit<Movie, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: '',
      description: '',
      youtubeId: ''
    });
    if (this.movie) {
      this.form.patchValue({
        title: this.movie.title,
        description: this.movie.description,
        youtubeId: this.movie.youtubeId
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as Omit<Movie, 'id'>);
      if (!this.movie) this.form.reset();
    }
  }
}