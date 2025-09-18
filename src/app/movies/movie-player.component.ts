import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'movie-player',
  standalone: true,
  template: `
<div class="video-container">
  <iframe
    [src]="youtubeUrl"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

  `,
  styles: [`
    .video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
    `]
})
export class MoviePlayerComponent {
  @Input() youtubeId!: string;
  youtubeUrl!: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }


  ngOnChanges() {
    if (this.youtubeId) {
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.youtubeId}`
      );
    }
  }
}