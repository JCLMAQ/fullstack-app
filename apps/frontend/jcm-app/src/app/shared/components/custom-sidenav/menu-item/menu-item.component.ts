import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TranslatePipe } from "@ngx-translate/core";
import { MenuItem } from '../menu-items';

@Component({
  selector: 'app-menu-item',
  imports: [
    RouterModule,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    TranslatePipe
  ],
  template: `
    <a
      mat-list-item
      [style.--mat-list-list-item-leading-icon-start-space]="indentation()"
      class="menu-item"
      [routerLink]="routeHistory() + '/' + item().route"
      (click)="nestedItemOpen.set(!nestedItemOpen())"
      routerLinkActive="selected-menu-item"
      #rla="routerLinkActive"
      [activated]="rla.isActive"
    >
      <mat-icon
        [fontSet]="rla.isActive ? 'material-icons' : 'material-icons-outlined'"
        matListItemIcon
        >{{ item().icon }}</mat-icon
      >
      @if(!collapsed()) {
        <span matListItemTitle>{{ item().label | translate }}</span>
      }

      @if(item().subItems) {
        <span matListItemMeta>
          @if(nestedItemOpen()) {
          <mat-icon>expand_less</mat-icon>
          } @else {
          <mat-icon>expand_more</mat-icon>
          }
        </span>
      }
    </a>

    @if (nestedItemOpen() ) {
      <div @expandContractMenu>
        @for(subItem of item().subItems; track subItem.route) {
          <app-menu-item
            [item]="subItem"
            [routeHistory]="routeHistory() + '/' + item().route"
            [collapsed]="collapsed()"
          />
        }
      </div>
    }
  `,
  styles: `
    :host * {
      transition-property: margin-inline-start, opacity, height;
      transition-duration: 500ms;
      transition-timing-function: ease-in-out;
    }
    .menu-item {
      border-left: 5px solid;
      border-left-color: rgba(0, 0, 0, 0);

    }

    //Active style - primary color css variable will be set in theming section
    .selected-menu-item {
      border-left-color: var(--mat-sys-primary);
      mat-icon {
        color: var(--mat-sys-primary);
      };
      mat-menu {
        color: var(--mat-sys-primary);
      }
      background: rgba(0, 0, 0, 0.05);
      // list-item-focus-label-text-color: var(--mat-sys-on-primary);
    }
  `,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' })),
      ]),
    ]),
  ],
})
export class MenuItemComponent {


  item = input.required<MenuItem>();
  collapsed = input.required<boolean>();
  routeHistory = input('');

  level = computed(() => this.routeHistory().split('/').length - 1);
  indentation = computed(() =>
    this.collapsed() ? '16px' : `${16 + this.level() * 16}px`
  );

  nestedItemOpen = signal(false);
}
