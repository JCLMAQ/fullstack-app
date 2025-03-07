import { Dictionaries, Dictionary } from "../../data/dictionaries";

export function getDictionary(language: string, dictionaries: Dictionaries): Dictionary {
    return dictionaries[language] ?? Object.values(dictionaries)[0];
}
