import { Component, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from "@fe/messages";
import { ResponsiveService } from '../../services/responsive.service';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterOutlet,
    MatButtonModule,
    MessagesComponent,
  ],
  template: `
    <app-header />
    <mat-sidenav-container  (backdropClick)="backDrop()">
      <mat-sidenav
          (keydown.escape)="backDrop()"
          [mode]="responsiveService.modeSideNav()"
          [opened]="responsiveService.sideNavOpen()"
          [style.width]="responsiveService.sideNavWidth()"
      >
        <app-custom-sidenav  />
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="responsiveService.styleMarginLeft()">
        <app-messages />
        <router-outlet></router-outlet>
        <!-- <a
          mat-fab
          extended
          class="!fixed bottom-5 right-10"
          href="https://zoaibkhan.lemonsqueezy.com/buy/4bc3b34d-4980-44be-80bc-bde1dc5b71e9"
          target="_blank"
        >
          <mat-icon>code</mat-icon>Get the code</a
        > -->
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `

  .content {
        padding: 24px;
        box-sizing: border-box;
      }

      mat-sidenav-container {
        height: calc(100vh - 64px);
      }

      mat-sidenav-content {
        transition: margin-left 500ms ease-in-out;
      }

      mat-sidenav {
        transition: width 500ms ease-in-out;
      }

      mat-sidenav {
        --mat-sidenav-container-divider-color: var(--sys-outline-variant);
        --mat-sidenav-container-shape: 0px;
      }

  `,
})
export default class LayoutComponent {

  responsiveService = inject(ResponsiveService);

  readonly sidenav = viewChild.required(MatSidenav);

  backDrop() {
    if (this.responsiveService.isMobile()) {
      this.responsiveService.isMenuBarOpen.set(!this.responsiveService.isMenuBarOpen());
    }
  }
}
