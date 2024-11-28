import { effect, Injectable } from '@angular/core';
import { Widget } from '../../models/dashboard';
import { widgetsDirectory } from './widgets-directory';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  fetchWidgets(): Widget[] {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');

    if (!widgetsAsString) {
      return [];
    }

    const widgets = JSON.parse(widgetsAsString) as Widget[];
    widgets.forEach((widget) => {
      const content = widgetsDirectory.find((w) => w.id === widget.id)?.content;
      if (content) {
        widget.content = content;
      }
    });
    return widgets;
  }

  fetchOrder(): number[] {
    const orderAsString = localStorage.getItem('dashboardWidgetsOrder');
    if (!orderAsString) {
      return [];
    }
    return JSON.parse(orderAsString) as number[];
  }

  saveWidgets(widgets: Widget[]): Promise<void> {
    const widgetsWithoutContent: Partial<Widget>[] = widgets.map((w) => ({
      ...w,
    }));
    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });

    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );

    return Promise.resolve();
  }

  saveOrder(order: number[]): Promise<void> {
    localStorage.setItem('dashboardWidgetsOrder', JSON.stringify(order));
    return Promise.resolve();
  }
}
