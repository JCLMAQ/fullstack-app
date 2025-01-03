import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: 'i18nDate',
})

export class I18nDatePipe extends DatePipe implements PipeTransform {

  constructor() {
    const translateService = inject(TranslateService);

    super(translateService.currentLang);
  }
}
