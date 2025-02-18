import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";
import { patchState, signalStore, type, withComputed, withHooks, withProps, withState } from "@ngrx/signals";
import { entityConfig } from "@ngrx/signals/entities";
import { TasksService } from "../services/task.service";
import { ItemInterface } from "./task.model";



type ItemsStateInterface = {
  items: ItemInterface[];
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialStateInterface: ItemsStateInterface = {
  items: [],
  filter: { query: '', order: 'asc' },
};


const entityName = 'tasks';

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  selectId: (task: ItemInterface) => task.id || '',
  collection: entityName
})


export const TasksStore = signalStore(

  { providedIn: 'root' },

  withDevtools('TasksStore'),
  // withEntities(storeConfig),
  withState(initialStateInterface),

  withProps(() => ({
    _itemService: inject(TasksService),
    _toastService: inject(ToastService),
  })),

  withProps((store) => {
      const aitemsResource = resource<ItemInterface[], string>({
        loader: () => {
          return store._itemService.getAllTasks();
        },
      });
      return { aitemsResource };
    }),

  withProps((store) => {
    const itemsResource = store.aitemsResource.asReadonly();
    patchState(store, { items: itemsResource.value() });
    const items = itemsResource.value() || [];
    if (items.length > 0) {
      patchState(store, {items: items});
      // patchState(store, setAllEntities(items, storeConfig));
    }



    return { itemsResource };
  }),

  withComputed((store) => ({
    // items: computed(() => store._itemsResource.value() || []),
    // itemsLoading: computed(() => store._itemsResource.isLoading()),
    // itemsLoadingError: computed(() => store._itemsResource.error()),
  })),



 withHooks({
    onInit(store) {
      // patchState(store, { items: store.itemsResource.value() });
      // const items = store.itemsResource.value() || [];
      // if(items.length > 0) {
      //   patchState(store, setAllEntities(items, storeConfig));
      // }

      const toastService = store._toastService;
      const itemsError = store.aitemsResource.error;
      displayErrorEffect(itemsError, toastService);
    },
    onDestroy() {
      console.log('on destroy');
    },
  })

);
