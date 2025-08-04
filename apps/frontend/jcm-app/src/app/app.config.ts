import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { provideAppErrorHandler } from '@fe/shared';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './app.routes';
import { DICTIONARIES } from './data/dictionaries';
import { AuthInterceptor } from './features/auth/interceptors/auth.interceptor';
import { LoggingInterceptor } from './features/auth/interceptors/loggind.interceptors';
import { DICTIONARIES_TOKEN } from './tokens/dictionaries.token';


// export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }



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
          fallbackLang: 'en',
          loader: provideTranslateHttpLoader({
            prefix:"i18n/",
            suffix:".json",
            enforceLoading: true,
            useHttpBackend: true,
          }),
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

