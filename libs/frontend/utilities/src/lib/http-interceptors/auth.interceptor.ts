/*
An authentication interceptor is used to add authentication tokens
to outgoing requests and handle authentication-related errors.
This is essential for securing your application’s API requests.
*/

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function AuthInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const authToken = 'your-auth-token';
    if (authToken) {
      const cloned = req.clone({
          headers: req.headers
              .set('Authorization',`Bearer ${authToken}`)
      });
      return next(cloned);
  }
  else {
      return next(req);
  }
  }

