import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { ResponsiveService } from '../../responsive.service';

@Component({
    selector: 'app-header',
    imports: [MatToolbar, MatIcon, MatButtonModule],
    template: `
    <mat-toolbar class="mat-elevation-z3">
    <!-- <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button> -->
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

  // collapsed = model.required<boolean>();
  collapsed = this.responsiveService.isCollapsed;
  barOpen = this.responsiveService.isMenuBarOpen;

  darkMode = signal(false);

  setDarkModeClass = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });


  toggleMenu() {
    if(!this.barOpen()){
      this.barOpen.set(!this.barOpen());
    } else {
      // this.collapsed.set(!this.collapsed());
      if(!this.collapsed()){
        this.collapsed.set(!this.collapsed());

      } else {
        this.barOpen.set(!this.barOpen());
        this.collapsed.set(!this.collapsed());
      }
  }


    // if(this.responsiveService.isMobile()){
    //   // this.sidenav().close();
    //   this.sidenav().toggle();
    //   // this.collapsed.set(!this.collapsed());
    //   // this.responsiveService.collapsed.set(false);
    // } else {
    //   this.sidenav().open();
    //   // this.responsiveService.collapsed.set(!this.responsiveService.collapsed());
    // }
  }
}
