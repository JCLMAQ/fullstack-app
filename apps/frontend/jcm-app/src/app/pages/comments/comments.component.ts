import { Component, inject } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  standalone: true,
    selector: 'app-comments',
    imports: [],
    template: `
    <br>
    <span>responsiveService.isMobile(): {{responsiveService.isMobile()}}</span>
    <br>
    <span>responsiveService.isCollapsed(): {{responsiveService.isCollapsed()}}</span>
    <br>
    <span>resopnsiveService.sidenavWidth(): {{responsiveService.sidenavWidth()}}</span>
    <br>
    <span>responsiveService.modeSideNav(): {{responsiveService.modeSideNav()}}</span>
    <br>
    <span>responsiveService.sideNavSelectorMode(): {{responsiveService.sideNavSelectorMode()}}</span>
    <br>
    <span>responsiveService.smallNavbarWidth(): {{responsiveService.smallNavbarWidth()}}</span>
    <br>
    <span>responsiveService.extraSmallWidth(): {{responsiveService.sidenavWidth()}}</span>


    `,
    styles: []
})
export default class CommentsComponent {
responsiveService = inject(ResponsiveService);



}
