import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { Task } from '@prisma/client';
import { TasksService } from '../services/task.service';

@Component({
  selector: 'lib-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  private readonly tasksService = inject(TasksService);

  private baseUrl = 'api/';


tasks = resource<Task[], string>({
  loader: () => {
 return this.tasksService.getAllTasks();
},
  });


}
