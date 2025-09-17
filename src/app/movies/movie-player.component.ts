import { Component, Input } from '@angular/core';

@Component({
  selector: 'movie-player',
  standalone: true,
  template: `
    <div>
      <iframe 
        width="320" height="180"
        [src]="youtubeUrl"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `
})
export class MoviePlayerComponent {
  @Input() youtubeId!: string;

  get youtubeUrl() {
    return 'https://www.youtube.com/embed/' + this.youtubeId;
  }
}