import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { wrapGrid } from 'animate-css-grid';
import Chart from 'chart.js/auto';
import { AppStore } from '../../app.store';
import { WidgetComponent } from '../../shared/components/widget/widget.component';
import { ResponsiveService } from '../../shared/services/responsive.service';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardStore } from './dashboard.store';

@Component({
    selector: 'app-dashboard',
    imports: [
        WidgetComponent,
        DashboardHeaderComponent,
        CdkDropList,
        CdkDropListGroup,
    ],
    template: `
    <div cdkDropListGroup>
      <app-dashboard-header />
      <div
        #dashboard
        class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-[150px] gap-4"
      >
        @for (widget of store.addedWidgets(); track widget.id) {
        <app-widget
          [data]="widget"
          cdkDropList
          (cdkDropListDropped)="drop($event)"
          [cdkDropListData]="widget.id"
        />
        }
        <div cdkDropList (cdkDropListDropped)="drop($event)">
          <div></div>
        </div>
      </div>
    </div>
    <div>

        <span> user = {{ appStore.user()?.email }}</span>
        <br>

        <span> user full name = {{ appStore.user()?.nickName }}</span>
        <br>

        <span> modeSideNav = {{ reponsiveService.modeSideNav() }}</span>
        <br>

        <span> sideNavWidth = {{ reponsiveService.sideNavWidth() }}</span>
        <br>

        <span> sideNavOpen = {{ reponsiveService.sideNavOpen() }}</span>
        <br>
        @if(reponsiveService.isMenuBarOpen()) {
          <span>isMenuBarOpen = true</span>
        } @else {
          <span>isMenuBarOpen = false</span>
        }
        <br>
        @if(reponsiveService.isMobile()) {
          <span>isMobile = true</span>
        } @else {
          <span>isMobile = false</span>
        }
        <br>
        @if(this.reponsiveService.mobileLimitWidth()) {
          <span> mobile limit = true</span>
        } @else {
          <span> mobile limit = false</span>
        }
        <br>
        @if(reponsiveService.isCollapsed()) {
          <span> collapsed = true</span>
        } @else {
          <span> collapsed = false</span>
        }
    </div>
  `,
    providers: [DashboardStore]
})
export default class DashboardComponent {

  appStore = inject(AppStore);

  reponsiveService = inject(ResponsiveService);

  dashboard = viewChild.required<ElementRef>('dashboard');

  store = inject(DashboardStore);
  clearAnimations = () => {};

  ngOnInit() {
    const { unwrapGrid } = wrapGrid(this.dashboard().nativeElement, {
      duration: 300,
    });
    this.clearAnimations = unwrapGrid;

    Chart.defaults.color = 'gray';
  }

  ngOnDestroy() {
    this.clearAnimations();
  }

  drop(event: CdkDragDrop<number, any>) {
    const {
      previousContainer,
      container,
      item: { data },
    } = event;

    if (data) {
      this.store.addWidgetAtPosition(data, container.data);
      return;
    }

    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
