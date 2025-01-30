import { withCallState, withDevtools, withUndoRedo } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from "@angular/cdk/collections";
import { computed, inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";
import { signalStore, type, withComputed, withHooks, withProps, withState } from "@ngrx/signals";
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { TodoService } from "../services/todo.service";
import { withItemsComputedSelectors } from './item-computed.selectors';
import { withNavigationMethods } from './item-navigation.methods';
import { withItemsSelectionMethods } from './item-selection.methods';
import { withTodoComputed } from './todo-computed.selectors';
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
  itemLoaded: boolean;
};


export const initialItemState: ItemStateInterface = {
  items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<ItemInterface>(true, []), // true for multiple selection and [ ] for the initial selection
  itemLoaded: false
};

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: 'todo'
});

export const TodoStore = signalStore(
  { providedIn: 'root' },
  // { providedIn: 'root' , protectedState: false},

  withState(initialItemState),
  withTodoComputed(),
  withDevtools('todo'),
  withEntities(storeConfig),
  withCallState({collection: 'todo'}),
  withUndoRedo({
    maxStackSize: 100, // limit of undo/redo steps - `100` by default
    collections: [] as never[], // entity collections to keep track of - unnamed collection is tracked by default
    keys: [], // non-entity based keys to track - `[]` by default
    skip: 0, // number of initial state changes to skip - `0` by default
  }),

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

    itemsResource: store._itemsResource.asReadonly(),
  })),

  withItemsComputedSelectors(),
  withItemsSelectionMethods(),
  withNavigationMethods(),
  withTodoComputed(),
  withComputed((store) => ({
    loading: computed(() =>
      store.itemsResource.isLoading()
)
  })),



  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const itemsError = store._itemsResource.error;
      store.initSelectedID();
      displayErrorEffect(itemsError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
