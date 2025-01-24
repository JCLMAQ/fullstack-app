import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { Todo } from '@prisma/client';
import { TodoService } from '../services/todo.service';
import { TodoStore } from '../store/todo.state';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {

// Data access through store
  #store = inject(TodoStore);

  items = this.#store.todosResource;
  loading = this.#store.loading;
  errorLoading = this.#store.todosResource.error;


  private readonly todoService = inject(TodoService);
// Direct access to DB
  todos = resource<Todo[], string>({
    loader: () => {
    return this.todoService.getItems();
  },
    });

}
