import { Clipboard } from '@angular/cdk/clipboard';
import { inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  SignalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

// Base on: https://stackblitz.com/edit/stackblitz-starters-2ea27n?file=src%2Fwith-clipboard.ts
// NgRx Signals Store - custom features with dynamic properties

export interface ClipboardState {
  text: string;
  copied: boolean;
}

export interface ClipboardOptions<Prop> {
  prefix: Prop;
  resetCopiedStateAfter?: number;
}

export type PrefixedClipboardState<Prop extends string> = {
  [K in Prop as `${K}Text`]: string;
} & {
  [K in Prop as `${K}Copied`]: boolean;
};

export type PrefixedClipboardMethods<Prop extends string> = {
  [K in Prop as `${K}Copy`]: (value: string) => {};
};

export function withClipboard<Prop extends string>(
  options: ClipboardOptions<Prop>
): SignalStoreFeature<
  { state: {}; props: {}; methods: {} },
  {
    state: PrefixedClipboardState<Prop>;
    props: {};
    methods: PrefixedClipboardMethods<Prop>;
  }
>;
export function withClipboard<Prop extends string>(
  options: ClipboardOptions<Prop>
): SignalStoreFeature {
  const { textKey, copiedKey } = getClipboardStateKeys(options.prefix);
  const { copyKey } = getClipboardMethodsKeys(options.prefix);

  return signalStoreFeature(
    withState({ [textKey]: '', [copiedKey]: false }),
    withMethods((store, clipboard = inject(Clipboard)) => ({
      [copyKey](value: string) {
        clipboard.copy(value);

        if (options?.resetCopiedStateAfter) {
          setTimeout(
            () => patchState(store, { [copiedKey]: false }),
            options?.resetCopiedStateAfter
          );
        }
        patchState(store, { [textKey]: value, [copiedKey]: true });
      },
    }))
  );
}

function getClipboardStateKeys(prefix: string) {
  return {
    textKey: `${prefix}Text`,
    copiedKey: `${prefix}Copied`,
  };
}

function getClipboardMethodsKeys(prefix: string) {
  return {
    copyKey: `${prefix}Copy`,
  };
}
