// import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import { setLoaded, setLoading } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { setAllEntities } from '@ngrx/signals/entities';
import { ItemInterface } from './todo.model';
import { ItemStateInterface } from './todo.slice';
import { storeConfig } from './todo.storeconfig';

export function withItemsLoadingMethods() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>(),
     },
    withMethods((store) => ({
      async load() {
        patchState(store, setLoading(storeConfig.collection));
        const items = await store._itemService.getAllItems();
        patchState(store, { items });
        patchState(store, setAllEntities(items as ItemInterface[], storeConfig));
        patchState(store, setLoaded(storeConfig.collection));
      }})),
  );
}


