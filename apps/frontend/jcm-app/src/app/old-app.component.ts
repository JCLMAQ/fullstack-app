import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { AppStore } from './app.store';
import { ResponsiveService } from './shared/services/responsive.service';
// import { CustomSidenavComponent } from './';
// // import { HeaderComponent } from './components/header/header.component';
// // import { ResponsiveService } from './components/services/responsive.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ...MATERIAL,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {


  responsiveService = inject(ResponsiveService);
  appStore = inject(AppStore);

  logCurrentUser = effect(() => {
    console.log(this.appStore.user());
  });

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
