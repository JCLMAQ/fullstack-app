// Retry interceptor can be used to automatically retry
//failed HTTP requests, which can be helpful in handling intermittent network
//issues.

import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

export function RetryInterceptor  (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // Define the maximum number of retries
    const maxRetries = 3;
    return next(request).pipe(retry(maxRetries));
  }
}
