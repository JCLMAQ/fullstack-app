import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { wrapGrid } from 'animate-css-grid';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {
  CdkDropList,
  CdkDragDrop,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import Chart from 'chart.js/auto';
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
  `,
    providers: [DashboardStore]
})
export default class DashboardComponent {
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
