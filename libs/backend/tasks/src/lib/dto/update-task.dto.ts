import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto, CreateUserTaskLinkDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateUserTaskLinkDto extends PartialType(CreateUserTaskLinkDto) {}
