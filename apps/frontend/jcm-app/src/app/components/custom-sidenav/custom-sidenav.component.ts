import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { menuItems } from '../../menu-items';
import { CreditsComponent } from '../credits/credits.component';

@Component({
    selector: 'app-custom-sidenav',
    template: `
    <div class="pt-6 flex flex-col items-center">
      <img
        class="object-cover object-center rounded-full mb-3"
        [width]="profilePicSize()"
        [height]="profilePicSize()"
        src="profile-pic.webp"
      />
      <div
        class="text-center mb-2 h-[3rem] {{
          collapsed() ? '!h-0 opacity-0' : ''
        }}"
      >
        <h2 class="text-lg">Zoaib Khan</h2>
        <p class="text-sm">Admin</p>
      </div>
    </div>
    <mat-nav-list class="[--mat-list-active-indicator-shape:0px]">
      @for (item of menuItems; track item.label) {
      <app-menu-item [item]="item" [collapsed]="collapsed()" />
      }
    </mat-nav-list>

    @if (!collapsed()) {
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
  collapsed = input<boolean>(false);

  menuItems = menuItems;

  profilePicSize = computed(() => (this.collapsed() ? '32' : '100'));
}
