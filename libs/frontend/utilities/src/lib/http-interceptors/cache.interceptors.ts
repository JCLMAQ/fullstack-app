/*
A caching interceptor can be used to implement client-side caching
for HTTP responses,
reducing the number of unnecessary network requests.
*/

import {
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export function CacheInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const cache = new Map<string, HttpResponse<any>>();

    if (req.method !== 'GET') {
      return next(req);
    }

    const cachedResponse = cache.get(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          cache.set(req.url, event);
        }
      })
    );
  }
}
