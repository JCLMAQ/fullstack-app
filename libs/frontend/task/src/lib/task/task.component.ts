import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'lib-task',
  imports: [CommonModule, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})

export class TaskComponent {}
