/*
A CSP interceptor can be used to automatically add Content Security Policy
headers to outgoing HTTP requests to improve security.
*/

import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export function CspInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const cspHeader = "default-src 'self'; script-src 'self' 'unsafe-inline'";
    const cspRequest = req.clone({
        setHeaders: {
            'Content-Security-Policy': cspHeader,
        },
    });
    return next(cspRequest);

}
