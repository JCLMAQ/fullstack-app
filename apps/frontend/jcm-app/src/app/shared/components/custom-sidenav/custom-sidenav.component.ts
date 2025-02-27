import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AppStore } from '../../../appstore/app.store';
import { ResponsiveService } from '../../services/responsive.service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { menuItems } from './menu-items';
import SidenavHeaderComponent from './sidenav-header/sidenav-header.component';

@Component({
  selector: 'app-custom-sidenav',
  template: `
    @if(appStore.user()){
      <app-sidenav-header [collapsed]="collapsed()" />
    }
    <mat-nav-list class="[--mat-list-active-indicator-shape:0px] mb-6">
      @for (item of menuItems; track item.label) {
      <app-menu-item [item]="item" [collapsed]="collapsed()" />
      }
    </mat-nav-list>
  `,
  styles: [
    `
      :host * {
        transition-property: width, height, opacity;
        transition-duration: 500ms;
        transition-timing-function: ease-in-out;
      }
    `,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatIconModule,
    MenuItemComponent,
    SidenavHeaderComponent,
  ],
})
export class CustomSidenavComponent {
  appStore = inject(AppStore);
  responsiveService = inject(ResponsiveService);

  collapsed = computed(() => this.responsiveService.isCollapsed());

  menuItems = menuItems;

}
