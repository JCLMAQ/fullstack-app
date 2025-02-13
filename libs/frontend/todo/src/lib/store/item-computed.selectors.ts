import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ItemStateInterface } from './todo.store';

export function withItemsComputedSelectors() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
    withComputed(({ itemsBis, selection, selectedId, selectedIds }) => ({
      selectedItem: computed(() => itemsBis().find((x) => x.id === selectedId())),
      selectedItemIndex: computed(()=> selectedIds().findIndex((x) => x === selectedId()) ),
      selectedItems: computed(() => selection().selected.entries),
      lastPositionIndex: computed(() => itemsBis().length - 1),
      })
    ));
}
