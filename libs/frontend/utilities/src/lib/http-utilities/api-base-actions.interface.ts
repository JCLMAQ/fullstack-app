// Create an interface for strong typing. also for intellisense.
// from: https://medium.com/@zeeshankhan8838/best-practice-to-use-http-service-1f4378145620

import { Observable } from 'rxjs';

export type ParamsType = { hideLoader: boolean }

export interface IApiBaseActions {
  Get(url: string, params?: ParamsType): Observable<unknown>;

  GetAll(url: string, params?: ParamsType): Observable<unknown>;

  Post(url: string, data: unknown, params?: ParamsType): Observable<unknown>;

  Delete(url: string, data?: unknown, params?: ParamsType): Observable<unknown>;

  Put(url: string, data: unknown, params?: ParamsType): Observable<unknown>;

}
