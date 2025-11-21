import { Injectable } from '@nestjs/common';
import { Prisma, Todo, UserTodoLink } from '@prisma/prisma';
import { PrismaService } from '@prisma/prisma-client';
import { CreateTodoDto, CreateTodoWithUsersDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    private repository: TodosRepository
  ) {}

   async createOneTodo(params: {
    content: Todo[`content`];
    comment: UserTodoLink[`comment`];
    title: Todo[`title`];
    userId: UserTodoLink[`userId`];
    orgId: Todo[`orgId`]
    mainTodoId: string
    }) {
        const { title , content, comment, userId, orgId, mainTodoId } = params;
        let data: Prisma.TodoCreateInput = {
          title,
          content,
          Users: {
            create: {
              userId: userId,
              isAuthor: true,
              isAssigned: true,
              comment
            }
          },
          orderTodo: 0,
          owner: {
            connect: {
              id: userId
            }
          },
          org: {
            connect: {
              id: orgId
            }
          }
        };
      if (mainTodoId !== "") {
        data = { ...data, mainTodo: { connect: { id: mainTodoId } } }
      }
      const todo = await this.repository.createOneTodo({ data: data });
      return todo;
  }

  async getTodos(params: {
      skip?: number,
      take?: number,
      cursor?: Prisma.TodoWhereUniqueInput,
      orderBy?: Prisma.TodoOrderByWithRelationInput,
      orgId?: Todo[`orgId`],
      ownerId?: Todo[`ownerId`],
      withTasks?: string;
      withUsers?: string;
    })
    {
      const { ownerId, orgId, withTasks, withUsers} = params
      let withTasksboolean = false;
      let withUsersboolean = false;
      if(withTasks === 'true') { withTasksboolean = true}
      if(withUsers === 'true') { withUsersboolean = true}
      return await this.repository.getTodos( {
        include: {
          Tasks: withTasksboolean,
          Users: withUsersboolean
        },
        where: { ownerId, orgId }});
    }

  async getOneTodo(todoId: string, params: {
    withSubTodos: string,
    withTasks: string,
    withUsers: string,
  }): Promise<Todo | null> {
    const {withTasks, withSubTodos, withUsers} = params
    // let withTasksboolean = true
    // if(withTasks === 'false') { withTasksboolean = false}
    return await this.repository.getOneTodo({
      include: {
        Tasks: JSON.parse(withTasks),
        SubTodos: JSON.parse(withSubTodos),
        Users: JSON.parse(withUsers)
      },
      where: { id: todoId}})
  }

  async updateTodo( params: {
    where: Prisma.TodoWhereUniqueInput,
    data: Prisma.TodoUpdateInput,
  }): Promise<Todo>
  {
    const {where, data} = params;
    return await this.repository.updateTodo({where, data});
  }

  async softDeleteTodo( params: {
    todoId: Todo[`id`],
  })
  {
    const { todoId } = params
    return await this.repository.softDeleteTodo({where: { id: todoId}});
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput) {
    return await this.repository.deleteTodo(where)
  }


  // For test purpose
  async getAllTodos(){
    return await this.repository.getAllTodos();
  }

async getAllTodosWithTasks(): Promise<Todo[]>{
    return await this.repository.getAllTodosWithTasks();
  }

  // New methods using standardized DTOs
  async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<TodoEntity> {
    const data: Prisma.TodoCreateInput = {
      title: createTodoDto.title,
      content: createTodoDto.content,
      orderTodo: createTodoDto.orderTodo,
      todoState: createTodoDto.todoState,
      owner: {
        connect: {
          id: userId
        }
      },
      org: {
        connect: {
          id: createTodoDto.orgId
        }
      }
    };

    if (createTodoDto.mainTodoId) {
      data.mainTodo = { connect: { id: createTodoDto.mainTodoId } };
    }

    const todo = await this.repository.createOneTodo({ data });
    return new TodoEntity(todo);
  }

  async createTodoWithUsers(createTodoWithUsersDto: CreateTodoWithUsersDto, userId: string): Promise<TodoEntity> {
    const { users, ...todoData } = createTodoWithUsersDto;

    const data: Prisma.TodoCreateInput = {
      title: todoData.title,
      content: todoData.content,
      orderTodo: todoData.orderTodo,
      todoState: todoData.todoState,
      owner: {
        connect: {
          id: userId
        }
      },
      org: {
        connect: {
          id: todoData.orgId
        }
      },
      Users: {
        create: users.map(user => ({
          userId: user.userId,
          isAuthor: user.isAuthor ?? true,
          isAssigned: user.isAssigned ?? true,
          comment: user.comment ?? ''
        }))
      }
    };

    if (todoData.mainTodoId) {
      data.mainTodo = { connect: { id: todoData.mainTodoId } };
    }

    const todo = await this.repository.createOneTodo({ data });
    return new TodoEntity(todo);
  }

  async updateTodoWithDto(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const data: Prisma.TodoUpdateInput = {
      ...updateTodoDto
    };

    const todo = await this.repository.updateTodo({
      where: { id },
      data
    });
    return new TodoEntity(todo);
  }


}
