import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: ` <h2 class="text-2xl">Analytics</h2> `,
  styles: [],
})
export default class AnalyticsComponent {}
