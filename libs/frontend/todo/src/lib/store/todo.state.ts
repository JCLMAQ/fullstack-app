import { withCallState, withDevtools, withUndoRedo } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from "@angular/cdk/collections";
import { inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";
import { signalStore, type, withHooks, withProps, withState } from "@ngrx/signals";
import { entityConfig, withEntities } from '@ngrx/signals/entities';
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

const todoConfig = entityConfig({
  entity: type<TodoInterface>(),
  collection: 'todo'
});

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withDevtools('todo'),
  withEntities(todoConfig),
  withCallState({collection: 'todo'}),
  withUndoRedo({
    maxStackSize: 100, // limit of undo/redo steps - `100` by default
    collections: ['todo'], // entity collections to keep track of - unnamed collection is tracked by default
    keys: [], // non-entity based keys to track - `[]` by default
    skip: 0, // number of initial state changes to skip - `0` by default
  }),
  withState(initialTodoState),
  withProps(() => ({
    _todoService: inject(TodoService),
    _toastService: inject(ToastService),
  })),
  withProps((store) => {
    const _todosResource = resource<TodoInterface[], string>({
      loader: () => {
        return store._todoService.getItems();
      },
    });
    return { _todosResource };
  }),
  withProps((store) => ({
    todosResource: store._todosResource.asReadonly(),
  })),
  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const todosError = store._todosResource.error;

      displayErrorEffect(todosError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
