import { CommonModule } from '@angular/common';
import { Component, inject, resource, Signal } from '@angular/core';
import { MATERIAL } from '@fe/material';
import { ToastService } from '@fe/shared';
import { Task } from '@prisma/client';
import { TasksService } from '../services/task.service';
import { ItemInterface } from '../store/task.model';
import { TasksStore } from '../store/task.store';

@Component({
  selector: 'lib-task',
  imports: [CommonModule, ...MATERIAL],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})

export class TaskComponent { //implements OnInit {
  private readonly tasksService = inject(TasksService);
private readonly toastService = inject(ToastService);
  #store = inject(TasksStore);
items: Signal<ItemInterface[]> = this.#store.items;
itemsEntitites: Signal<ItemInterface[]> = this.#store.tasksEntities;
itemsResource = this.#store.itemsResource;

  // ngOnInit() {
  //  this.#store.load();
  // }



  tasks = resource<Task[], string>({
    loader: () => {
      return this.tasksService.getAllTasks();
    },
  });


}
