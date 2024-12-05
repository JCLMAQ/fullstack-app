import { NgClass } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
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
    NgClass
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  responsiveService = inject(ResponsiveService);

  title = 'jcm-app';

  // isCollapsed = signal(false);
  // isMobile = computed(() => this.responsiveService.mobileLimitWidth())

  // smallNavbar = signal('65px');
  // smallNavbarWidth = computed(() => (this.responsiveService.extraSmallWidth() ? '0px' : '65px'));
  // sidenavWidth = computed(() => (this.responsiveService.isCollapsed() ? this.smallNavbarWidth() : '250px'));

  themeSelectorMode = computed(() => {
    if(this.responsiveService.largeWidth() ) {
      return 'side';
  }
      return 'over'
  })
// side: MatDrawerMode;
mode = 'side' as MatDrawerMode

  // componentSelectorMode = computed(() => {
  //   if(this.responsiveService.smallWidth() || this.responsiveService.extraSmallWidth() ) {
  //     return 'over';
  //   }
  //     return 'side';
  // });

}
