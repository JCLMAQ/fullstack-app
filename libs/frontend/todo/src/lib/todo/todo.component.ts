import { Component } from '@angular/core';
import { TodoListComponent } from "../todo-list/todo-list.component";

@Component({
  selector: 'lib-todo',
  standalone: true,
  imports: [ TodoListComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {}
