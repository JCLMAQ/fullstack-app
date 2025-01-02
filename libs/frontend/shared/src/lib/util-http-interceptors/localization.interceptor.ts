/*
 A localization interceptor can be used to automatically include
 the user’s preferred language or locale in HTTP requests, ensuring
 that the server sends responses in the appropriate language.
*/

import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocaleService } from './locale.service';

export function LocalizationInterceptor (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const localeService = inject(LocaleService) as LocaleService;

    const userLocale = localeService.getUserLocale();
    const localizedRequest = request.clone({
      setHeaders: {
        'Accept-Language': userLocale,
      },
    });
    return next(localizedRequest);
  }
}
