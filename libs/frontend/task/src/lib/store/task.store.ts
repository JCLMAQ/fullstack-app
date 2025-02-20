import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed, inject, resource } from "@angular/core";
import { ToastService } from "@fe/shared";
import { patchState, signalStore, type, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
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

  { providedIn: 'root' },

  withDevtools('TasksStore'),

  withState(initialItemsSlice),
  withEntities(storeConfig),
  withProps(() => ({
    _itemService: inject(TasksService),
    _toastService: inject(ToastService),
  })),
  withProps((store) => {
      const _itemsResource = resource<ItemInterface[], string>({
        loader: () => {
          return store._itemService.getAllTasks();
        },
      });
      return {
        _itemsResource,
        itemsResource: _itemsResource.asReadonly(),
        itemsBis: computed(() => store.itemsResource),
      };

    }),

    withMethods((store) => ({

      async load() {
          const items = await store._itemService.getAllTasks();
          patchState(store, { items  });
          patchState(store, setAllEntities(items as ItemInterface[], storeConfig));

      },

    })),


    withHooks({
        onInit(store) {
            store.load();
        }
    })

);
