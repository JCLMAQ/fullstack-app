/*
A loading indicator interceptor can be used to
show and hide loading spinners or progress bars during HTTP requests,
providing a better user experience.
*/

import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

export function LoadingInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const loadingService = inject(LoadingService) as LoadingService;

    loadingService.showLoading();
    return next(request).pipe(
      finalize(() => {
        loadingService.hideLoading();
      })
    );
  }
