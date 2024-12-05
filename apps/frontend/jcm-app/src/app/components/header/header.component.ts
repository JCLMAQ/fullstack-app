import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  standalone: true,
    selector: 'app-header',
    imports: [MatToolbar, MatIcon, MatButtonModule],
    template: `
    <mat-toolbar class="mat-elevation-z3">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <button mat-icon-button (click)="darkMode.set(!darkMode())">
        @if (darkMode()) {
        <mat-icon>light_mode</mat-icon>
        } @else {
        <mat-icon>dark_mode</mat-icon>
        }
      </button>
    </mat-toolbar>
  `,
    styles: `

    mat-toolbar {
        position: relative;
        z-index: 5;
        justify-content: space-between;
        --mat-toolbar-container-background-color: var(--sys-surface-container-low);
    }

  `
})
export class HeaderComponent {

  responsiveService = inject(ResponsiveService);

  readonly sidenav = viewChild.required(MatSidenav);

  // isCollapsed = model.required<boolean>();

  toggleMenu() {
    this.responsiveService.modeSideNav.set(this.responsiveService.sideNavSelectorMode()); // over or side
    // this.responsiveService.isCollapsed.set(!this.responsiveService.isCollapsed())
    if(this.responsiveService.isMobile()){
      // this.sidenav().mode = 'over';
      this.sidenav().toggle();

      // this.responsiveService.isCollapsed.set(false);
    } else {
      this.responsiveService.isCollapsed.set(!this.responsiveService.isCollapsed())
      this.sidenav().toggle();
      this.sidenav().mode = 'side';
      // this.responsiveService.modeSideNav.set('over');
      // this.responsiveService.isCollapsed.set(!this.responsiveService.isCollapsed());
    }
  }

  // componentSelectorMode = computed(() => {
  //   if(this.smallWidth() || this.extraSmallWidth() ) {
  //     return 'over';
  //   }
  //     return 'side';
  // });

  darkMode = signal(false);

  setDarkModeClass = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });
}
