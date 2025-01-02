import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function LoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}

// @Injectable()
// export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   const authJwtToken = localStorage.getItem('authJwtToken');
//   const authReq = req.clone({
//     setHeaders: { Authorization: `Bearer ${authJwtToken}` }
//   });
//   return next.handle(authReq);
// }

export function AuthInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
        const authJwtToken = localStorage.getItem('authJwtToken');
        if (authJwtToken) {
            const cloned = req.clone({
                headers: req.headers
                    .set('Authorization',`Bearer ${authJwtToken}`)
            });

            return next(cloned);
        }
        else {
            return next(req);
        }
    }




