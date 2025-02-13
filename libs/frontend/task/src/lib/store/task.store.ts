import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed, inject, resource } from "@angular/core";
import { displayErrorEffect, ToastService } from "@fe/shared";
import { signalStore, withComputed, withHooks, withProps, withState } from "@ngrx/signals";
import { TasksService } from "../services/task.service";
import { ItemInterface } from "./task.model";



type ItemsState = {
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ItemsState = {
  filter: { query: '', order: 'asc' },
};

export const TasksStore = signalStore(

  { providedIn: 'root' },
withDevtools('TasksStore'),
  withState(initialState),

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
      return { _itemsResource };
    }),
    withProps((store) => {
      const itemsResource = store._itemsResource.asReadonly();
      return { itemsResource };
    }),
  withComputed((store) => ({
    items: computed(() => store._itemsResource.value() || []),
    itemsLoading: computed(() => store._itemsResource.isLoading()),
    itemsLoadingError: computed(() => store._itemsResource.error()),
  })),
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
