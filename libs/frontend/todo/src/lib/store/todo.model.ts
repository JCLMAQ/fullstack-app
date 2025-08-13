import { Todo } from '@prisma/prisma-client-new';

export interface ItemInterface extends Todo {}
// export interface ItemInterface extends Todo { Users: true, Tasks: true, SubTodos: true}
export interface ItemPartialInterface extends Partial<Todo>{}
export interface ItemPartialInterfaceWithInclude extends Partial<Todo> { include: { Categories: true, Comments: true, LikedBys: true }}

export const entityName = 'todos';
