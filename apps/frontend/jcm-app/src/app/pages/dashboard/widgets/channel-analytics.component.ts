import { Component, ElementRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  standalone: true,
    selector: 'app-channel-analytics',
    imports: [MatButtonModule],
    template: `
    <div class="h-[calc(100%-100px)] w-full">
      <canvas #chart></canvas>
    </div>

    <button mat-raised-button class="mt-4">Go to channel analytics</button>
  `,
    styles: `
  `
})
export default class ChannelAnalyticsComponent {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            label: 'Views',
            data: [100, 102, 105, 110, 115, 120],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
            fill: 'start',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  }
}
