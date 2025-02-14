import { SelectionModel } from "@angular/cdk/collections";
import { computed, inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";

import { withCallState, withDevtools, withUndoRedo } from "@angular-architects/ngrx-toolkit";
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { entityConfig, withEntities } from '@ngrx/signals/entities';
import { TodoService } from "../services/todo.service";
import { withNavigationMethods } from "./item-navigation.methods";
import { ItemInterface } from "./todo.model";

export interface ItemStateInterface {
  itemsBis: ItemInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<ItemInterface>,
  itemLoaded: boolean,
  currentPosition: number,
        lastPosition: number,
        navigation: {
          hasNext: boolean,
          hasPrevious: boolean,
          isFirst: boolean,
          isLast: boolean
        }
};


export const initialItemState: ItemStateInterface = {
  itemsBis: [],
  filter: {
    ownerId: "test",
    orgId: "test"
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<ItemInterface>(true, []), // true for multiple selection and [ ] for the initial selection
  itemLoaded: false,
  currentPosition: 0,
        lastPosition: 0,
        navigation: {
          hasNext: false,
          hasPrevious: false,
          isFirst: true,
          isLast: true
        }
};

const entityName = 'todo';

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: entityName,
  // selectId: (item: ItemInterface) => item.id
});

export const TodoStore = signalStore(
  { providedIn: 'root' },
  // { providedIn: 'root' , protectedState: false},
  withState(initialItemState),

  withNavigationMethods(),

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

  withDevtools(entityName),
  withEntities(storeConfig),
  withCallState({collection: entityName}),
  withUndoRedo({
    maxStackSize: 100, // limit of undo/redo steps - `100` by default
    collections: [] as never[], // entity collections to keep track of - unnamed collection is tracked by default
    keys: [], // non-entity based keys to track - `[]` by default
    skip: 0, // number of initial state changes to skip - `0` by default
  }),

  withComputed((store) => ({
    items: computed(() => store._itemsResource.value() || []),
    itemsLoading: computed(() => store._itemsResource.isLoading()),
    itemsLoadingError: computed(() => store._itemsResource.error()),
  })),


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
    })),
// Navigation Methods
withMethods(
  (store) => ({
    initNavButton(initialItemId: string) {
      let currentPosition = 0;
      let lastPosition = 0;
      if(store.selection.isEmpty() ) { // no selected items
      // if(store.selection().selected.length <= 1 ) { // no selected items
        currentPosition = store.items().findIndex(p => p.id === initialItemId);
        if ( currentPosition === -1) {
          currentPosition = 0;
        }
        lastPosition = store.items().length - 1;
        if ( lastPosition < 0 || lastPosition < currentPosition ) {
          lastPosition = 0;
        }
      } else {
        currentPosition = store.selection().selected.findIndex(p => p.id === initialItemId);
        lastPosition = store.selection().selected.length - 1;
      }
      if(lastPosition < 0 ) { lastPosition = 0; }
      if(lastPosition < currentPosition ) { lastPosition = currentPosition; }
      this.navStateMgt(currentPosition, lastPosition);
      // patchState(store, items => ({ ...items, selectedId: initialItemId }));
      patchState(store, { selectedId: initialItemId });

    },

    navStateMgt( currentPosition: number, lastPosition: number) {
      if(lastPosition < 0 ) { lastPosition = 0; }
      if(currentPosition > lastPosition ) { currentPosition = lastPosition }
      if(currentPosition < 0 ) { currentPosition = 0}

      let hasNext = false;
      let hasPrevious = false;
      let isFirst = true;
      let isLast = true;

      if (currentPosition === 0 && lastPosition === 0) {
        hasNext = false;
        hasPrevious = false;
        isFirst = true;
        isLast = true;
      } else {
        if (currentPosition === 0) {
          hasNext = true;
          hasPrevious = false;
          isFirst = true;
          isLast = false;
        } else
          if (currentPosition === lastPosition) {
            hasNext = false;
            hasPrevious = true;
            isFirst = false;
            isLast = true;
          } else {
            hasNext = true;
            hasPrevious = true;
            isFirst = false;
            isLast = false;
          }
      }
      patchState(store, {
        currentPosition: currentPosition,
        lastPosition: lastPosition,
        navigation: {
          hasNext: hasNext,
          hasPrevious:  hasPrevious,
          isFirst: isFirst,
          isLast: isLast
        }
      });
    },

    next() {
      let currentPosition = store.currentPosition() + 1
      const lastPosition = store.lastPosition()
      if (currentPosition > lastPosition) {
        currentPosition = lastPosition
      }
      this.navStateMgt( currentPosition, lastPosition );
    },

    last() {
      const currentPosition = store.lastPosition()
      const lastPosition = store.lastPosition()
      this.navStateMgt( currentPosition, lastPosition );
    },

    first() {
      const currentPosition = 0;
      const lastPosition = store.lastPosition();
      this.navStateMgt( currentPosition, lastPosition );
    },

    previous() {
      let currentPosition = store.currentPosition() - 1
      const lastPosition = store.lastPosition();
      if (currentPosition < 0) {
        currentPosition= 0
      }
      this.navStateMgt( currentPosition, lastPosition );
    },
  })
),




    withComputed(({items}) => ({
      doneCount: computed(() => items().filter((x) => x.todoState === 'DONE').length),
      undoneCount: computed(() => items().filter((x) => x.todoState !== 'DONE').length),
      percentageDone: computed(() => {
        const done = items().filter((x) => x.todoState === 'DONE').length;
        const total = items().length;
        if (total === 0) {
          return 0;
        }
        return (done / total) * 100;
      })
    }
    )),

    withComputed(({ items, selection, selectedId, selectedIds }) => ({
      selectedItem: computed(() => items().find((x) => x.id === selectedId())),
      selectedItemIndex: computed(()=> selectedIds().findIndex((x) => x === selectedId()) ),
      selectedItems: computed(() => selection().selected.entries),
      lastPositionIndex: computed(() => items().length - 1),
      })
    ),

  withHooks({
    onInit(store) {
      const toastService = store._toastService;
      const itemsError = store._itemsResource.error;
      // store.initSelectedID(); // Init selected Id
      displayErrorEffect(itemsError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })
);
