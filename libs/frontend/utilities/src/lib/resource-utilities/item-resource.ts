import { inject, resource, ResourceRef, Signal } from '@angular/core';
import { API_ITEM_URL } from './api-item';
import { API_BASE_URL } from './base-url.token';
import { ItemInterface } from './items.model';

// Based on: https://danielsogl.medium.com/functional-programming-in-angular-exploring-inject-and-resources-fd0311fd4445

export function getPostByIdResource(itemId: Signal<number | string>): ResourceRef<ItemInterface | undefined> {
  const baseUrl = inject(API_BASE_URL);
  const apiItemUrl = inject(API_ITEM_URL);
  return resource<ItemInterface | undefined, { id: number | string }>({
    request: () => ({ id: itemId() }),
    loader: async ({ request, abortSignal }) => {
      const response = await fetch(`${baseUrl}/${apiItemUrl}/${request.id}`, {
        signal: abortSignal,
      });
      if (!response.ok) {
        return undefined;
      }
      return response.json();
    },
  });
}
/*
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { getPosByIdtResource } from './shared/posts.inject';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe],
  styleUrl: './app.component.css',
  template: `
    @if (post.isLoading()) {
     <p>Loading...</p>
    } @else if (post.error()) {
     <p>Error: {{ post.error() }}</p>
    } @else {
     <p>{{ post.value() | json }}</p>
    }
  `,
})
export class AppComponent {
  private readonly postId = signal(1);

  protected readonly post = getPosByIdtResource(this.postId);
}
*/
