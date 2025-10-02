
import { DataService } from "@angular-architects/ngrx-toolkit";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENVIRONMENT_TOKEN } from "@fe/shared";
import { EntityId } from "@ngrx/signals/entities";
import { ItemInterface } from "../store/task.model";

export type TasksFilter = {
  ownerId: string;
  orgId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService implements DataService<ItemInterface,{ ownerId: string, orgId: string }> {

  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  // private apiUrl = `api`;
  private apiUrl = this.environment.API_BACKEND_PREFIX;
  private baseUrl = `${this.apiUrl}`;

  async load(filter: TasksFilter): Promise<ItemInterface[]> {
    const tasks = await fetch(`${this.baseUrl}/alltasks`);
    // const tasks = await fetch(`${this.baseUrl}/tasks?ownerId=${filter.ownerId}&orgId=${filter.orgId}`);
    return tasks.json();
  }

  async loadById(id: EntityId): Promise<ItemInterface> {
    const task = await fetch(`${this.baseUrl}/tasks/${id}`);
    return task.json();
  }

  async create(item: ItemInterface): Promise<ItemInterface> {
    // implementation for creating a new task
    // const newItem = await // votre code pour créer une nouvelle tâche
    // return newItem;
    throw new Error("Method not implemented.");
  }

  async update(item: ItemInterface): Promise<ItemInterface> {
    // implementation for updating a task
    // const updatedItem = await // votre code pour mettre à jour une tâche
    // return updatedItem;
    throw new Error("Method not implemented.");
  }

  async updateAll(entities: ItemInterface[]): Promise<ItemInterface[]> {
    // implementation pour mettre à jour plusieurs tâches
    // const updatedEntities = await // votre code pour mettre à jour plusieurs tâches
    // return updatedEntities;

    throw new Error("Method not implemented.");
  }

  async delete(entity: ItemInterface): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tasks/${entity.id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) throw new Error("Unable to delete task!");
  }
}


