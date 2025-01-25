import { computed } from '@angular/core';
import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { ItemStateInterface } from './todo.state';

export function withTodoComputed() {
  return signalStoreFeature(
    { state: type<ItemStateInterface>() },
    withComputed(({ items }) => ({
      doneCount: computed(() => items().filter((x) => x.todoState === 'DONE').length),
      undoneCount: computed(() => items().filter((x) => x.todoState !== 'DONE').length),
      percentageDone: computed(() => {
        const done = items().filter((x) => x.todoState = 'DONE').length;
        const total = items().length;
        if (total === 0) {
          return 0;
        }
        return (done / total) * 100;
      })
    }
    ))
  );
}
