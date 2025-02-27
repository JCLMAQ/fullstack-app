
import { setLoaded, setLoading, withCallState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { effect, inject, resource } from "@angular/core";
import { ToastService } from "@fe/shared";
import { getState, patchState, signalStore, watchState, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { TodoService } from "../services/todo.service";
import { withItemsComputedSelectors } from "./item-computed.selectors";
import { withNavigationMethods } from "./item-navigation.methods";
import { withItemsSelectionMethods } from "./item-selection.methods";
import { withTodoComputed } from "./todo-computed.selectors";
import { ItemInterface } from "./todo.model";
import { initialItemState } from "./todo.slice";
import { storeConfig } from "./todo.storeconfig";


export const TodoStore = signalStore(
  { providedIn: 'root' },
  // { providedIn: 'root' , protectedState: false},

  withState(initialItemState),
  withNavigationMethods(),
  withDevtools(storeConfig.collection),
  withCallState(storeConfig),
  withEntities(storeConfig),

  withProps(() => ({
      _itemService: inject(TodoService),
      _toastService: inject(ToastService),
    })),
  withProps((store) => {
    const _itemsResource = resource<ItemInterface[], string>({
      loader: async () => {
        return await store._itemService.getAllItems();
      },
    });
    return {
      _itemsResource,
      itemsResource: _itemsResource.asReadonly(),
    };
  }),
  withProps((store) => {
    const itemsResource = store._itemsResource.asReadonly();
    return { itemsResource };
  }),
  withMethods((store) => ({
      async load() {
        patchState(store, setLoading(storeConfig.collection));
        const items = await store._itemService.getAllItems();
        patchState(store, { items });
        patchState(store, setAllEntities(items as ItemInterface[], storeConfig));
        patchState(store, setLoaded(storeConfig.collection));
      },
      })),

  withItemsSelectionMethods(),
  withItemsComputedSelectors(),

  withTodoComputed(),


withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[watchState] Task state', state);
      });

      effect(() => {
        console.log('[effect] Task state', getState(store));
      });
    // Items loading
      store.load();
    }
  })

);
