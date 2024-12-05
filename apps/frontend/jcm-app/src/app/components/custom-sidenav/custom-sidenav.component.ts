import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { menuItems } from '../../menu-items';
import { ResponsiveService } from '../../services/responsive.service';
import { CreditsComponent } from '../credits/credits.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    standalone: true,
    selector: 'app-custom-sidenav',
    template: `
    <div class="pt-6 flex flex-col items-center">
      <img
        class="object-cover object-center rounded-full mb-3"
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="IMG_8836.heic"
      />
      <div
        class="text-center mb-2 h-[3rem] {{
          responsiveService.isCollapsed() ? '!h-0 opacity-0' : ''
        }}"
      >
      <h2 class="text-lg">Stylton</h2>
      <p class="text-sm">The true Admin</p>
      </div>
    </div>
    <mat-nav-list class="[--mat-list-active-indicator-shape:0px]">
      @for (item of menuItems; track item.label) {
      <app-menu-item [item]="item" [collapsed]="responsiveService.isCollapsed()" />
      }
    </mat-nav-list>

    @if (!responsiveService.isCollapsed()) {
    <!-- <app-credits class="absolute bottom-5 bg-surface-container py-3" /> -->
    }
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
        CreditsComponent,
    ]
})
export class CustomSidenavComponent {

  responsiveService = inject(ResponsiveService);

  // collapsed = input<boolean>(false);

  menuItems = menuItems;

  profilePicSize = computed(() => (this.responsiveService.isCollapsed() ? '32' : '100'));
  // profilePicSize = computed(() => (this.collapsed() ? '32' : '100'));
}
