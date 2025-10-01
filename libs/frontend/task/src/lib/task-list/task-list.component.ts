import { Component, inject, Signal } from '@angular/core';

import { MATERIAL } from '@fe/material';
import { ToastService } from '@fe/shared';
import { TasksService } from '../services/task.service';
import { ItemInterface } from '../store/task.model';
import { TasksStore } from '../store/task.store';

@Component({
  selector: 'lib-task-list',
  imports: [ ...MATERIAL],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private readonly tasksService = inject(TasksService);
  private readonly toastService = inject(ToastService);
  #store = inject(TasksStore);
  // items: Signal<ItemInterface[]> = this.#store.items;
  itemsEntitites: Signal<ItemInterface[]> = this.#store.tasksEntities;
  // itemsResource = this.#store.itemsResource;
  itemsLoading = this.#store.tasksLoading;
  itemsLoaded = this.#store.tasksLoaded;
  itemsError = this.#store.tasksError;

}
