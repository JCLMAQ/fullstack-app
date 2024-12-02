import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private readonly extraSmall = '(max-width: 299px)';
  private readonly small = '(min-width: 300px) and(max-width: 599px)';
  private readonly medium = '(min-width: 600px) and (max-width: 999px)';
  private readonly large = '(min-width: 1000px)';

  breackpointObserver = inject(BreakpointObserver);

  screenWidth = toSignal(this.breackpointObserver.observe([
    this.extraSmall,
    this.small,
    this.medium,
    this.large
  ]));

extraSmallWidth = computed(() => this.screenWidth()?.breakpoints[this.extraSmall]);
smallWidth = computed(() => this.screenWidth()?.breakpoints [this.small]);
mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large]);

}


