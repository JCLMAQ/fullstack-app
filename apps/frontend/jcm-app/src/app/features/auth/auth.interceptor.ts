import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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




