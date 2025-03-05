import { computed, inject } from "@angular/core";
import { patchState, signalStoreFeature, SignalStoreFeature, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { getDictionary } from "./app.helpers";
import { initialAppSlice } from "./app.slice";
import { changeLanguage } from "./app.updaters";


export function withDictionariesFeatures(): SignalStoreFeature{
  return signalStoreFeature(
    withState(initialAppSlice),
    withProps(() => ({
        _dictionaries: inject(DICTIONARIES_TOKEN)
    })),
    withComputed(store => {
        return {
            selectedDictionary: computed(() =>
                getDictionary(store.selectedLanguage(),store._dictionaries))
          }}),
    withMethods(store => {
        const languages = Object.keys(store._dictionaries);
        return {
            changeLanguage: () => patchState(store, changeLanguage(languages))
        }
    }),
    withHooks(store => ({
        onInit: () => {
            const languages = Object.keys(store._dictionaries);
            patchState(store, {
                possibleLanguages: languages,
                selectedLanguage: languages[0]
            })
        }
    }))
  )
}
