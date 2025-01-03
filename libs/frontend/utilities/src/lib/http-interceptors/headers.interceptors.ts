/*
A headers interceptor can be used to add custom headers
to outgoing HTTP requests. This is often used
to set headers like ‘Content-Type’ or include API keys.
*/

import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export function HeadersInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': 'your-api-key',
    });
    const headersRequest = request.clone({ headers });
    return next(headersRequest);
  }

