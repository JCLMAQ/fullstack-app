import { Todo } from "@prisma/client";

export interface ItemInterface extends Todo {}
// export interface ItemInterface extends Todo { Users: true, Tasks: true, SubTodos: true}
export interface ItemPartialInterface extends Partial<Todo>{}
export interface ItemPartialInterfaceWithInclude extends Partial<Todo> { include: { Categories: true, Comments: true, LikedBys: true }}
