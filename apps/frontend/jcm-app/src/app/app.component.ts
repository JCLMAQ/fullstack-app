import { NgClass } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { ResponsiveService } from './responsive.service';

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


  readonly sidenav = viewChild.required(MatSidenav);

  title = 'jcm-app';


  backDrop() {
    if (this.responsiveService.isMobile()) {
      this.responsiveService.isMenuBarOpen.set(!this.responsiveService.isMenuBarOpen());
    }
  }

  themeSelectorMode = computed(() => {
    if(this.responsiveService.largeWidth() ) {
      return 'side';
  }
      return 'over'
  })


}
