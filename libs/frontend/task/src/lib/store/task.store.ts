import { withCallState, withDataService, withDevtools, withUndoRedo } from "@angular-architects/ngrx-toolkit";
import { effect, inject, Type } from "@angular/core";

import { ToastService } from "@fe/shared";
import { getState, signalStore, type, watchState, withHooks, withProps } from "@ngrx/signals";
import { entityConfig, withEntities } from "@ngrx/signals/entities";
import { TasksService } from "../services/task.service";
import { ItemInterface } from "./task.model";

const entityName = 'tasks';

const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: entityName,
  selectId: (task: ItemInterface) => task.id,
})


export const TasksStore = signalStore(

  // { providedIn: 'root' },
  // withState(initialItemsSlice),
  withDevtools('TasksStore'),
  withCallState(storeConfig),
  withEntities(storeConfig),
  withProps(() => ({
    _itemService: inject(TasksService),
    _toastService: inject(ToastService),
  })),
  withDataService({
    dataServiceType: TasksService as Type<TasksService>,
    filter: {  ownerId: "", orgId: "" },
    collection: storeConfig.collection,
  }),
  withUndoRedo({collections: [ storeConfig.collection ]}),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[watchState] Task state', state);
      });

      effect(() => {
        console.log('[effect] Task state', getState(store));
      });
    // Items loading
     store.loadTasksEntities();
    }
  })

);
