import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private readonly extraSmall = '(max-width: 299px)';
  private readonly small = '(min-width: 300px) and(max-width: 599px)';
  private readonly medium = '(min-width: 600px) and (max-width: 999px)';
  private readonly large = '(min-width: 1000px)';
  private readonly mobileLimit = '(max-width: 800px)';

  breackpointObserver = inject(BreakpointObserver);

  screenWidth = toSignal(this.breackpointObserver.observe([
    this.extraSmall,
    this.small,
    this.medium,
    this.large,
    this.mobileLimit
  ]));

extraSmallWidth = computed(() => this.screenWidth()?.breakpoints[this.extraSmall]);
smallWidth = computed(() => this.screenWidth()?.breakpoints [this.small]);
mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large]);
mobileLimitWidth = computed(() => this.screenWidth()?.breakpoints[this.mobileLimit]);


isCollapsed = signal(false);

isMobile = computed(() => this.mobileLimitWidth() )

smallNavbarWidth = signal('65px');
// smallNavbarWidth = computed(() => (this.extraSmallWidth() ? '0px' : '65px'));
// sidenavWidth = computed(() => (this.isCollapsed() ? '65px' : '250px'));
sidenavWidth = computed(() => (this.isCollapsed() ? this.smallNavbarWidth() : '300px'));

modeSideNav = signal('side' as MatDrawerMode);

sideNavSelectorMode = computed(() => {
  if(this.isMobile() ) {
    // if(this.smallWidth() || this.extraSmallWidth() ) {
    return 'over';
  }
    return 'side';
});

}


