import { Component, computed, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStore } from '../../../../appstore/app.store';
import { ProfileEditorComponent } from '../../../../features/profile/profile-editor/profile-editor.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';

@Component({
  selector: 'app-sidenav-header',
  imports: [UserAvatarComponent],
  template: `
    <div class="pt-6 flex flex-col items-center">
      <button
        class="cursor-pointer hover:opacity-80 transition-opacity border-none bg-transparent p-0"
        (click)="openProfileEditor()"
        title="Cliquer pour modifier votre profil"
        aria-label="Modifier votre profil"
      >
        <app-user-avatar
          [photoUrl]="appStore.user()?.photoUrl"
          [cssClass]="avatarClasses()"
          alt="User profile picture"
        />
      </button>
      <div
        class="text-center mb-2 h-[3rem] {{
          collapsed() ? '!h-0 opacity-0' : ''
        }}"
      >
        <h2 class="text-lg">{{ appStore.user()?.nickName ?? 'User' }}</h2>
        <p class="text-sm">{{ appStore.user()?.Roles }}</p>
      </div>
    </div>
  `,
  styles: `

  :host * {
    transition-property: width, height, opacity;
    transition-duration: 500ms;
    transition-timing-function: ease-in-out;
  }

  `,
})
export default class SidenavHeaderComponent {
  collapsed = input(false);

  appStore = inject(AppStore);
  dialog = inject(MatDialog);

  profilePicSize = computed(() => (this.collapsed() ? '32' : '100'));

  avatarClasses = computed(() =>
    `object-cover object-center rounded-full mb-3 aspect-square w-[${this.profilePicSize()}px] h-[${this.profilePicSize()}px]`
  );

  openProfileEditor() {
    const dialogRef = this.dialog.open(ProfileEditorComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Profile updated successfully');
      }
    });
  }
}
