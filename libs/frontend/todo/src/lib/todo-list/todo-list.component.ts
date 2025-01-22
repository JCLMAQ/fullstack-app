import { CommonModule } from '@angular/common';
import { Component, inject, resource, signal } from '@angular/core';
import { Todo } from '@prisma/client';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private readonly todoService = inject(TodoService);

  todos = resource<Todo[], string>({
    loader: () => {
    return this.todoService.getAllTodos();
  },
    });


    searchQuery = signal('');

//   searchQuery = signal('');
//   public readonly users =  resource<Todo[],{searchQuery:string}>({
//   request:()=>this.searchQuery(),
//   loader: async({request,abortSignal})=> {
//     const users = fetch(`https://jsonplaceholder.typicode.com/users?name=${request}`,{
//       signal:abortSignal
//     });
//     return (await users).json();
//   }
// });



// searchQuery = signal('');
//     users = resource<User[],unknown>({
//     request:()=>this.searchQuery(),
//     loader: async({request,abortSignal})=> {
//       const abortController = new AbortController();
//       const users = fetch(`https://jsonplaceholder.typicode.com/users?name=${request}`,{
//         signal:abortController.signal
//       });
//       return (await users).json();
//     }
//   });

}
