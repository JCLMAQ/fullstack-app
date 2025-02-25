import { ItemInterface } from "./task.model";



export type ItemsSlice = {
  readonly items: ItemInterface[];
  readonly filter: { query: string; order: 'asc' | 'desc' };
};

export const initialItemsSlice: ItemsSlice = {
  items: [],
  filter: { query: '', order: 'asc' },
};
