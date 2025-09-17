import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'movie-player',
  standalone: true,
  template: `
    <div>
      <iframe 
        width="560" height="315"
        [src]="youtubeUrl"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `
})
export class MoviePlayerComponent {
  @Input() youtubeId!: string;
  youtubeUrl!: SafeResourceUrl;
    constructor(private sanitizer: DomSanitizer) {}

 
    ngOnChanges() {
    if (this.youtubeId) {
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.youtubeId}`
      );
    }
  }
}