import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<unknown>,
        next: HttpHandler): Observable<HttpEvent<unknown>> {

        const authJwtToken = localStorage.getItem('authJwtToken');
        if (authJwtToken) {
            const cloned = req.clone({
                headers: req.headers
                    .set('Authorization',`Bearer ${authJwtToken}`)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
