/*
A request timing interceptor can be used to measure and log the
time taken for each HTTP request,
helping you identify performance bottlenecks.
*/

import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export function RequestTimingInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const startTime = Date.now();
    return next(request).pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request to ${request.url} took ${duration}ms`);
      })
    );
  }

