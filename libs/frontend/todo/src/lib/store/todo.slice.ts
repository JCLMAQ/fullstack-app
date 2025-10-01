import { SelectionModel } from "@angular/cdk/collections";
import { ItemInterface } from "./todo.model";

export interface ItemStateInterface {
  items: ItemInterface[],
  filter: {
    ownerId: string | null
    orgId: string | null,
  },
  selectedId: string | null,
  selectedIds: string[],
  selection: SelectionModel<ItemInterface>,
  entityName: string,

};


export const initialItemState: ItemStateInterface = {
  items: [],
  filter: {
    ownerId: null,
    orgId: null
  },
  selectedId: null,
  selectedIds: [],
  selection: new SelectionModel<ItemInterface>(true, []), // true for multiple selection and [ ] for the initial selection
  entityName: 'todos',
};
