import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class AppComponent {

  title = 'jcm-app';
  appStore = inject(AppStore);

  logCurrentUser = effect(() => {
    console.log(this.appStore.user());
  });
}
