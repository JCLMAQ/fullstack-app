import { Todo } from "@prisma/client";

export interface TodoInterface extends Todo { Users: true, Tasks: true, SubTodos: true}
export interface TodoPartialInterface extends Partial<Todo>{}
export interface TodoPartialInterfaceWithInclude extends Partial<Todo> { include: { Categories: true, Comments: true, LikedBys: true }}
