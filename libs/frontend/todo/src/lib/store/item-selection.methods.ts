// import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { ItemStateInterface } from './todo.slice';


// Based on: https://www.angulararchitects.io/blog/the-new-ngrx-signal-store-for-angular-2-1-flavors/
// This is a feature that is used to handle the selection of items in a list.

export function withItemsSelectionMethods() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
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
    }))
  )
}


