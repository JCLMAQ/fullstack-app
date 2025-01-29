import { InjectionToken } from '@angular/core';

// Based on: https://danielsogl.medium.com/functional-programming-in-angular-exploring-inject-and-resources-fd0311fd4445

export const API_ITEM_URL = new InjectionToken<string>('API_ITEM_URL', {
  providedIn: 'root',
  factory: () => 'api/item',
  // factory: () => 'https://jsonplaceholder.typicode.com',
});
