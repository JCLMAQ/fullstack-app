import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function AuthInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authJwtToken = localStorage.getItem('authJwtToken');
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




