import { withCallState, withDevtools, withUndoRedo } from "@angular-architects/ngrx-toolkit";
import { SelectionModel } from "@angular/cdk/collections";
import { computed, inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";
import { signalStore, type, withComputed, withHooks, withProps, withState } from "@ngrx/signals";
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { TodoService } from "../services/todo.service";
import { ItemInterface } from "./todo.model";


export interface ItemStateInterface {
  // items: ItemInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<ItemInterface>,
};


export const initialItemState: ItemStateInterface = {
  // items: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<ItemInterface>(true, []), // true for multiple selection and [ ] for the initial selection
};


const entityName = 'todo';

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: entityName,
  // selectId: (item: ItemInterface) => item.id
});

export const TodoStoreBis = signalStore(
  { providedIn: 'root' },
  // { providedIn: 'root' , protectedState: false},
  withState(initialItemState),

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

  withProps((store) => {
    const itemsResource = store._itemsResource.asReadonly();
    return { itemsResource };
  }),

 withComputed((store) => ({
    items: computed(() => store.itemsResource.value() || []),
    itemsLoading: computed(() => store.itemsResource.isLoading()),
    itemsLoadingError: computed(() => store.itemsResource.error()),
  })),


  withDevtools(entityName),
  withEntities(storeConfig),
  withCallState({collection: entityName}),
  withUndoRedo({
    maxStackSize: 100, // limit of undo/redo steps - `100` by default
    collections: [] as never[], // entity collections to keep track of - unnamed collection is tracked by default
    keys: [], // non-entity based keys to track - `[]` by default
    skip: 0, // number of initial state changes to skip - `0` by default
  }),


  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const itemsError = store._itemsResource.error;
      displayErrorEffect(itemsError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
