import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ...MATERIAL,
    CustomSidenavComponent,
        HeaderComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'jcm-app';
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
