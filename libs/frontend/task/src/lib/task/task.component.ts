import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { ToastService } from '@fe/shared';
import { Task } from '@prisma/client';
import { TasksService } from '../services/task.service';
import { TasksStore } from '../store/task.store';

@Component({
  selector: 'lib-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  private readonly tasksService = inject(TasksService);
private readonly toastService = inject(ToastService);
  #store = inject(TasksStore);

  items = this.#store.itemsResource;
  // isLoading = this.#store.isLoading();
  itemsBis = this.#store.items;

  tasks = resource<Task[], string>({
    loader: () => {
      return this.tasksService.getAllTasks();
    },
  });

  reloadItemsResource() {
    this.#store.itemsResource.reload();
  }

}
