import { withCallState, withDevtools, withUndoRedo } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from "@angular/cdk/collections";
import { computed, inject, resource } from "@angular/core";
import { ToastService } from "@fe/shared";
import { signalStore, type, withComputed, withHooks, withProps, withState } from "@ngrx/signals";
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { TodoService } from "../services/todo.service";
import { ItemInterface } from "./todo.model";

export interface ItemStateInterface {
  items: ItemInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<ItemInterface>,
  todoLoaded: boolean;
};


export const initialItemState: ItemStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<ItemInterface>(true, []),
  todoLoaded: false
};

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: 'todo'
});

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withDevtools('todo'),
  withEntities(storeConfig),
  withCallState({collection: 'todo'}),
  withUndoRedo({
    maxStackSize: 100, // limit of undo/redo steps - `100` by default
    collections: ['todo'], // entity collections to keep track of - unnamed collection is tracked by default
    keys: [], // non-entity based keys to track - `[]` by default
    skip: 0, // number of initial state changes to skip - `0` by default
  }),
  withState(initialItemState),
  // withItemsSelectors(),
  withProps(() => ({
    _itemService: inject(TodoService),
    _toastService: inject(ToastService),
  })),
  withProps((store) => {
    const _itemsResource = resource<ItemInterface[], string>({
      loader: () => {
        return store._itemService.getItems();
      },
    });
    return { _itemsResource };
  }),
  withProps((store) => ({
    todosResource: store._itemsResource.asReadonly(),
  })),
  withComputed((store) => ({
    loading: computed(() =>
      store._itemsResource.isLoading()
)
  })),
  //  withItemsSelectors(),

  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const todosError = store._itemsResource.error;
      store['initSelectedID']()
      // displayErrorEffect(todosError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
