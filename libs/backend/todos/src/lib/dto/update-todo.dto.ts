import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto, CreateUserTodoLinkDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}

export class UpdateUserTodoLinkDto extends PartialType(CreateUserTodoLinkDto) {}
