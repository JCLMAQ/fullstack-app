import { type } from "@ngrx/signals";
import { entityConfig } from "@ngrx/signals/entities";
import { ItemInterface } from "./todo.model";


const entityName = 'todos';

export const storeConfig = entityConfig({
  entity: type<ItemInterface>(),
  collection: entityName,
  selectId: (item: ItemInterface) => item.id
});
