import { withCallState, withDevtools, withUndoRedo } from '@angular-architects/ngrx-toolkit';
import { SelectionModel } from "@angular/cdk/collections";
import { computed, inject, resource } from "@angular/core";
import { ToastService } from "@fe/shared";
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
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
  { providedIn: 'root'},
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
//  withItemsSelectionMethods(),
  withMethods((store) => ({
    initSelectedID() {
            const firstIndex = store.items().at(0)?.id;
            patchState(store, { selectedId: firstIndex })
          },

    itemIdSelectedId(selectedRowId: string) {
      patchState(store, { selectedId: selectedRowId })
    },

    toggleSelected( selectedRowId: string) {
      const allSelectedRowId = store.selectedIds();
      const existSelectedRowId = allSelectedRowId.filter( item => item === selectedRowId)
      if(existSelectedRowId.length === 0) {
        patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] })
        patchState(store, { selectedId: selectedRowId })
      } else {
        const updateSelectedRowId = allSelectedRowId.filter( item => item !== selectedRowId)
        patchState(store, { selectedIds: updateSelectedRowId })
        patchState(store, { selectedId: "" })
      }
    },
    newSelectedSelectionItem(newSelectedSelectionItemIndex: number) {
      const newSelectedSelectionItem = store.selection().selected[newSelectedSelectionItemIndex]
      // const selectedId = store.selectedIds()[newSelectedItemIndex]
      patchState(store,{ selectedId: newSelectedSelectionItem.id })
    },

    newSelectedItem(newSelectedItemIndex: number) {
      const selectedItem = store.items()[newSelectedItemIndex]
      patchState(store,{ selectedId: selectedItem.id })
    },

    selectedItemUpdate(selectedRowId: string){
      const allSelectedRowId = store.selectedIds();
      if(allSelectedRowId.length > 0 ) {
        const existSelectedRowId = allSelectedRowId.filter( item => item === selectedRowId);
        if(existSelectedRowId.length === 0) {
          patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] })
        };
        patchState(store, { selectedIds: [ ...store.selectedIds()] })
        patchState(store,{ selectedId: selectedRowId })
      } else {
        patchState(store, { selectedIds: [ ...store.selectedIds(), selectedRowId] });
        patchState(store,{ selectedId: selectedRowId })
      }
    }
  })
),


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
  // withItemsSelectionMethods(),

  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const todosError = store._itemsResource.error;
      store.initSelectedID();
      // displayErrorEffect(todosError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
