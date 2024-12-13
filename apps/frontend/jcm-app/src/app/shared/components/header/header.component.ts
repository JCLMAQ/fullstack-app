import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AppStore } from '../../../app.store';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
    selector: 'app-header',
    imports: [MatToolbar, MatIcon, MatButtonModule, MatMenuModule],
    template: `
    <mat-toolbar class="mat-elevation-z3 relative z-10">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <div class="flex-1"></div>
      <button mat-icon-button (click)="darkMode.set(!darkMode())">
        @if (darkMode()) {
        <mat-icon>light_mode</mat-icon>
        } @else {
        <mat-icon>dark_mode</mat-icon>
        }
      </button>

      @if (appStore.user(); as user) {
        <button mat-icon-button [mat-menu-trigger-for]="profileMenu">
          <img
            [src]="user?.photoUrl ?? 'person-placeholder.png'"
            class="w-[40px] h-[40px] object-cover rounded-full"
          />
        </button>
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item (click)="appStore.logout()">
            <mat-icon>logout</mat-icon>
            Log out
          </button>
        </mat-menu>
      } @else {
        <button mat-icon-button [mat-menu-trigger-for]="profileMenu2">
          <img
            [src]="'person-placeholder.png'"
            class="w-[40px] h-[40px] object-cover rounded-full"
          />
        </button>
        <mat-menu #profileMenu2="matMenu">
          <button mat-menu-item (click)="login()">
            <mat-icon>login</mat-icon>
            Log in
          </button>
        </mat-menu>
      }
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
  appStore = inject(AppStore);
  router = inject(Router);

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
  }

  login() {
    this.router.navigate(['/login']);
  }

}
