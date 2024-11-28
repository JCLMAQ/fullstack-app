import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  standalone: true,
    selector: 'app-latest-video',
    imports: [YouTubePlayer, MatButton],
    template: `
    <youtube-player width="250" height="150" videoId="Irf4aZC3LPY" />
    <button mat-raised-button class="mt-4">Go to video analytics</button>
  `,
    styles: `

    youtube-player ::ng-deep .youtube-player-placeholder {
      border-radius: 16px;
    }

  `
})
export default class LatestVideoComponent {}
