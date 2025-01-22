import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from "@angular/cdk/collections";
import { inject } from "@angular/core";
import { signalStore, withProps, withState } from "@ngrx/signals";
import { TodoService } from "../services/todo.service";
import { TodoInterface } from "./todo.model";

export interface TodoStateInterface {
  items: TodoInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<TodoInterface>,
  todoLoaded: boolean;
};


export const initialTodoState: TodoStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<TodoInterface>(true, []),
  todoLoaded: false
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withDevtools('todo'),
  withState(initialTodoState),
  withProps(() => ({
    _todoService: inject(TodoService),
  })),





);
