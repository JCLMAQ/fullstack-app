import { setLoaded, setLoading, withCallState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { effect, inject, resource } from "@angular/core";
import { ToastService } from "@fe/shared";
import { getState, patchState, signalStore, type, watchState, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { entityConfig, setAllEntities, withEntities } from "@ngrx/signals/entities";
import { TasksService } from "../services/task.service";
import { ItemInterface } from "./task.model";
import { initialItemsSlice } from "./task.slice";


const entityName = 'tasks';

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: entityName,
  selectId: (task: ItemInterface) => task.id,
})


export const TasksStore = signalStore(

  // { providedIn: 'root' },
  withState(initialItemsSlice),
  withDevtools('TasksStore'),
  withCallState(storeConfig),
  withEntities(storeConfig),
  withProps(() => ({
    _itemService: inject(TasksService),
    _toastService: inject(ToastService),
  })),
  withProps((store) => {
    const _itemsResource = resource<ItemInterface[], string>({
      loader: async () => {
        return await store._itemService.getAllTasks();
      },
    });
    // patchState(store, { itemsResource: _itemsResource }); // Add this line
    return {
      _itemsResource,
      itemsResource: _itemsResource.asReadonly(),
    };
  }),
  withMethods((store) => ({
    async load() {
      patchState(store, setLoading('tasks'));
      const items = await store._itemService.getAllTasks();
      patchState(store, { items });
      patchState(store, setAllEntities(items as ItemInterface[], storeConfig));
      patchState(store, setLoaded('tasks'));
    },
    })),
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
