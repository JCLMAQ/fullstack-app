import { InjectionToken } from '@angular/core';
// Based on: https://danielsogl.medium.com/functional-programming-in-angular-exploring-inject-and-resources-fd0311fd4445

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:4100',
  // factory: () => 'https://jsonplaceholder.typicode.com',
});
