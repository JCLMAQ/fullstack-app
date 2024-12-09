import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { CustomSidenavComponent } from '../custom-sidenav/old-custom-sidenav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    MatIcon,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterOutlet,
    MatButtonModule,
  ],
  template: `
    <!-- <app-header [(collapsed)]="collapsed" /> -->
    <app-header />
    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-custom-sidenav  />
        <!-- <app-custom-sidenav [collapsed]="collapsed()" /> -->
      </mat-sidenav>
      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet></router-outlet>
        <a
          mat-fab
          extended
          class="!fixed bottom-5 right-10"
          href="https://zoaibkhan.lemonsqueezy.com/buy/4bc3b34d-4980-44be-80bc-bde1dc5b71e9"
          target="_blank"
        >
          <mat-icon>code</mat-icon>Get the code</a
        >
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
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
