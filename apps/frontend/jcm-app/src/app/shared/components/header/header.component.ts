import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AppStore } from '../../../app.store';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
    selector: 'app-header',
    imports: [MatToolbar, MatIcon, MatButtonModule, MatMenuModule, MatDivider,TranslatePipe],
    template: `
    <mat-toolbar class="mat-elevation-z3 relative z-10">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>


      <div class="flex-stretch"></div>

      <h1 class="flex-1">{{"SITETITLE" | translate }}</h1>

      <div class="flex-1"></div>
      <button mat-icon-button (click)="darkMode.set(!darkMode())">
        @if (darkMode()) {
        <mat-icon>light_mode</mat-icon>
        } @else {
        <mat-icon>dark_mode</mat-icon>
        }
      </button>

      <button
          mat-icon-button
          [matMenuTriggerFor]="menulanguage"
          matTooltip="Change Language" aria-label="Change Theme Menu">
          <mat-icon>language</mat-icon>
        </button>
        <mat-menu #menulanguage="matMenu" >
          @for (lang of this.translate.getLangs(); track lang) {
            <button mat-menu-item [value]="lang" (click)="this.translate.use(lang)">
              {{ lang.toUpperCase() }}
            </button>
          }
        </mat-menu>

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
        <button mat-icon-button (click)="login()">
          <mat-icon>login</mat-icon>
        </button>
      }

      <button class="menu-button" mat-icon-button [matMenuTriggerFor]="submenu">
        <mat-icon>more_vert</mat-icon>
      </button>

    <mat-menu #submenu="matMenu">

      <button mat-menu-item (click)="navigate('picto')">
        <mat-icon>picture_in_picture</mat-icon>
        <span>{{"ToolBarMenu.Pictos" | translate}}</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="navigate('carousselpicture')">
          <mat-icon>camera</mat-icon>
          <span>{{"ToolBarMenu.Carrousel" | translate}}</span>
        </button>
        <mat-divider></mat-divider>
      <button mat-menu-item (click)="navigate('picture')">
          <mat-icon>camera_alt</mat-icon>
          <span>{{"ToolBarMenu.Images" | translate}}</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item (click)="navigate('users')">
            <mat-icon>supervised_user_circle</mat-icon>
            <span>{{"ToolBarMenu.Users" | translate}}</span>
          </button>
          <mat-divider></mat-divider>
        <button mat-menu-item (click)="navigate('choice')">
          <mat-icon>tune</mat-icon>
          <span>{{"ToolBarMenu.Choices" | translate}}</span>
        </button>
    </mat-menu>

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
  translate = inject(TranslateService);
  responsiveService = inject(ResponsiveService);
  appStore = inject(AppStore);
  router = inject(Router);

  readonly sidenav = viewChild.required(MatSidenav);

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

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

}
