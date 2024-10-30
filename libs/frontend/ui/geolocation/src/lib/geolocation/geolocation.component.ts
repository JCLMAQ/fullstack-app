import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-geolocation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geolocation.component.html',
  styleUrl: './geolocation.component.scss',
})
export class GeolocationComponent {}
