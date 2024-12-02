import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { ResponsiveService } from './services/responsive.service';

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
  readonly sidenav = viewChild.required(MatSidenav);
  responsiveService = inject(ResponsiveService);

  title = 'jcm-app';
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  themeSelectorMode = computed(() => {
    if(this.responsiveService.largeWidth() ) {
      return 'side';
  }
      return 'over'
  })

  componentSelectorMode = computed(() => {
    if(this.responsiveService.smallWidth()) {
      return 'over';
    }
      return 'side';
  });
}
