
export type DictionariesSlice = {
  readonly selectedLanguage: string;
  readonly possibleLanguages: string[];
};

export const initialDictionariesSlice: DictionariesSlice = {
  selectedLanguage: '',
  possibleLanguages: []
};
