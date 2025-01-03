/*
A compression interceptor can be used
to automatically request compressed content (e.g., gzip) from the server,
reducing the amount of data transferred over the network.
*/

import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function CompressionInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const compressedRequest = request.clone({
        setHeaders: {
            'Accept-Encoding': 'gzip, deflate',
        },
    });
    return next(compressedRequest);

}
