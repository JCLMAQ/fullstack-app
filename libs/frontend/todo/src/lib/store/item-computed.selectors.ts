import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ItemStateInterface } from './todo.state';

export function withItemsComputedSelectors() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
    withComputed(({ items, selection, selectedId, selectedIds }) => ({
      selectedItem: computed(() => items().find((x) => x.id === selectedId())),
      selectedItemIndex: computed(()=> selectedIds().findIndex((x) => x === selectedId()) ),
      selectedItems: computed(() => selection().selected.entries),
      lastPositionIndex: computed(() => items().length - 1),
      })
    ));
}
