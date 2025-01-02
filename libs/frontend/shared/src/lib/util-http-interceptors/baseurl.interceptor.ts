/*
A base URL interceptor can be used to
prepend a base URL to all HTTP requests,
simplifying the configuration of API endpoints.
*/

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function BaseUrlInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const baseUrl = environment.API_BASE_URL;//'https://api.example.com';


    const apiRequest = req.clone({
      url: `${baseUrl}${req.url}`,
    });
    return next(apiRequest);
}
