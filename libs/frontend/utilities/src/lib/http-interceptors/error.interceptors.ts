/*
An error handling interceptor can be used to centralize error
handling for HTTP requests. It can capture HTTP errors, log them,
and perform appropriate actions like displaying error messages.
*/

import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export function ErrorInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    return next(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle and log the error here
        console.error('HTTP Error:', error);
        // Optionally rethrow the error to propagate it
        return throwError(error);
      })
    );
  }

