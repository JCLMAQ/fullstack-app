// import { setLoaded, setLoading, withCallState, withUndoRedo } from '@fe/shared/util-signal-store';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods
} from '@ngrx/signals';
import { ItemStateInterface } from './todo.slice';
import { setAllEntities } from '@ngrx/signals/entities';
import { setLoaded, setLoading } from '@angular-architects/ngrx-toolkit';
import { storeConfig } from './todo.storeconfig';
import { ItemInterface } from './todo.model';

export function withItemsLoadingMethods() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>(),
      props:
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


