import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ItemInterface } from './todo.model';
import { ItemStateInterface } from './todo.slice';

export function withItemsComputedSelectors() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
    withComputed(({ items, selection, selectedId, selectedIds }) => ({
      selectedItem: computed<ItemInterface | undefined>(() => items().find((x) => x.id === selectedId())),
      selectedItemIndex: computed<number>(()=> selectedIds().findIndex((x) => x === selectedId()) ),
      selectedItems: computed(() => selection().selected.entries),
      lastPositionIndex: computed<number>(() => items().length - 1),
      })
    ));
}
