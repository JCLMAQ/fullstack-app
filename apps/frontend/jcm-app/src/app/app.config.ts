import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { provideAppErrorHandler } from '@fe/shared';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './app.routes';
import { DICTIONARIES } from './data/dictionaries';
import { AuthInterceptor } from './features/auth/interceptors/auth.interceptor';
import { LoggingInterceptor } from './features/auth/interceptors/loggind.interceptors';
import { DICTIONARIES_TOKEN } from './tokens/dictionaries.token';


// export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        AuthInterceptor,
        LoggingInterceptor,
      ]),

    ),


    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    { provide: DICTIONARIES_TOKEN, useValue: DICTIONARIES },

    provideNativeDateAdapter(),
    provideRouter(appRoutes, withComponentInputBinding(),),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'never',
        subscriptSizing: 'dynamic',
      },
    },
    provideAppErrorHandler(),
    importProvidersFrom(ReactiveFormsModule),


  ],
};

