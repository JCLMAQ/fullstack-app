import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ItemStateInterface } from './todo.store';

export function withTodoComputed() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
    withComputed(({ itemsBis }) => ({
      doneCount: computed(() => itemsBis().filter((x) => x.todoState === 'DONE').length),
      undoneCount: computed(() => itemsBis().filter((x) => x.todoState !== 'DONE').length),
      percentageDone: computed(() => {
        const done = itemsBis().filter((x) => x.todoState === 'DONE').length;
        const total = itemsBis().length;
        if (total === 0) {
          return 0;
        }
        return (done / total) * 100;
      })
    }
    ))
  );
}
