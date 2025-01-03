import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStore } from '../../../app.store';

export function AuthInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authJwtTokenbis = localStorage.getItem('authJwtToken');
    const authJwtToken = inject(AppStore).authToken();
    if (authJwtToken) {
        const cloned = request.clone({
            headers: request.headers
                .set('Authorization',`Bearer ${authJwtToken}`)
        });
        return next(cloned);
    }
    else {
        return next(request);
    }
}




