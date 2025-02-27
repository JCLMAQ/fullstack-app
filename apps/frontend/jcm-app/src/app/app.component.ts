import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppStore } from './appstore/app.store';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  template: ` <router-outlet /> `,
})
export class AppComponent {

  translateService = inject(TranslateService);

  constructor() {
    const translateService = this.translateService;
    translateService.addLangs(['en','fr']);
    translateService.setDefaultLang(this.appStore.user()?.Language || 'en'); // default language
    translateService.use(translateService.getBrowserLang() || 'en'); // use browser language by default
  }


  title = 'jcm-app';
  appStore = inject(AppStore);

  logCurrentUser = effect(() => {
    console.log(this.appStore.user());
  });
}
