import { Component, computed, inject, signal } from '@angular/core';
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

  responsiveService = inject(ResponsiveService);

  title = 'jcm-app';
  collapsed = signal(false);
  // smallNavbar = signal('65px');
  smallNavbarWidth = computed(() => (this.responsiveService.extraSmallWidth() ? '0px' : '65px'));
  sidenavWidth = computed(() => (this.collapsed() ? this.smallNavbarWidth() : '250px'));
  // sideNavWidthSignal = signal('250px');
  // sideNavWidth = linkedSignal({
  //   source: this.sideNavWidthSignal,
  //   computation: () => this.sideNavWidthSignal()
  // });


  themeSelectorMode = computed(() => {
    if(this.responsiveService.largeWidth() ) {
      return 'side';
  }
      return 'over'
  })

  componentSelectorMode = computed(() => {
    if(this.responsiveService.smallWidth() || this.responsiveService.extraSmallWidth() ) {
      return 'over';
    }
      return 'side';
  });

}
