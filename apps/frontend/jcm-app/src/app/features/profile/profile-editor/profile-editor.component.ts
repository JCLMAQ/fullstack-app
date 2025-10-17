import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { UserAvatarComponent } from '../../../shared/components/user-avatar/user-avatar.component';
import { AuthService } from '../../auth/Services/auth.service';

@Component({
  selector: 'app-profile-editor',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    UserAvatarComponent
  ],
  template: `
    <h2 mat-dialog-title>Modifier votre profil</h2>
    <mat-dialog-content>
      <mat-tab-group>
        <!-- Onglet Emoji -->
        <mat-tab label="Emoji">
          <div class="p-4">
            <h3 class="mb-4">Choisir un emoji :</h3>
            <div class="emoji-grid">
              @for (emoji of availableEmojis; track emoji) {
                <button
                  mat-button
                  class="emoji-button"
                  [class.selected]="selectedPhoto() === emoji"
                  (click)="selectPhoto(emoji)"
                >
                  {{ emoji }}
                </button>
              }
            </div>
          </div>
        </mat-tab>

        <!-- Onglet URL d'image -->
        <mat-tab label="Image URL">
          <div class="p-4">
            <mat-form-field class="w-full">
              <mat-label>URL de l'image</mat-label>
              <input
                matInput
                type="url"
                [(ngModel)]="imageUrl"
                placeholder="https://example.com/image.jpg"
                (input)="onImageUrlChange()"
              />
            </mat-form-field>

            @if (imageUrl()) {
              <div class="mt-4">
                <h4>Aperçu :</h4>
                <app-user-avatar
                  [photoUrl]="imageUrl()"
                  cssClass="w-[80px] h-[80px] rounded-full"
                  alt="Aperçu de l'image"
                />
              </div>
            }
          </div>
        </mat-tab>
      </mat-tab-group>

      <!-- Aperçu sélectionné -->
      @if (selectedPhoto()) {
        <div class="mt-4 text-center">
          <h4>Aperçu sélectionné :</h4>
          <p class="text-sm text-gray-600 mb-2">Valeur: "{{ selectedPhoto() }}"</p>
          <app-user-avatar
            [photoUrl]="selectedPhoto()"
            cssClass="w-[100px] h-[100px] rounded-full mx-auto"
            alt="Aperçu sélectionné"
          />
        </div>
      } @else {
        <div class="mt-4 text-center text-gray-500">
          <p>Aucune photo sélectionnée</p>
        </div>
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Annuler</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="!selectedPhoto() || saving()"
        (click)="save()"
      >
        {{ saving() ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .emoji-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: 8px;
      max-height: 300px;
      overflow-y: auto;
    }

    .emoji-button {
      min-width: 60px !important;
      height: 60px;
      font-size: 24px;
      border: 2px solid transparent;
      border-radius: 8px;
    }

    .emoji-button.selected {
      border-color: var(--mat-sys-primary);
      background-color: var(--mat-sys-primary-container);
    }

    .emoji-button:hover {
      border-color: var(--mat-sys-outline);
    }
  `
})
export class ProfileEditorComponent {
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<ProfileEditorComponent>);

  selectedPhoto = signal<string>('');
  imageUrl = signal<string>('');
  saving = signal<boolean>(false);

  // Liste d'emojis populaires pour les avatars
  availableEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓',
    '👴', '👵', '👮', '🕵️', '💂', '👷', '🤴', '👸', '👳', '👲',
    '🧕', '🤵', '👰', '🤰', '👼', '🎅', '🤶', '🦸', '🦹', '🧙',
    '🧚', '🧛', '🧜', '🧝', '🧞', '🧟', '🤖', '😺', '😸', '😹',
    '😻', '😼', '😽', '🙀', '😿', '😾', '🐶', '🐱', '🐭', '🐹',
    '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'
  ];

  selectPhoto(photo: string) {
    console.log('Selecting photo:', photo);
    this.selectedPhoto.set(photo);
    this.imageUrl.set(''); // Reset URL when emoji is selected
    console.log('Selected photo is now:', this.selectedPhoto());
  }

  onImageUrlChange() {
    const url = this.imageUrl();
    if (url && url.trim()) {
      this.selectedPhoto.set(url);
    }
  }

  async save() {
    const photo = this.selectedPhoto();
    console.log('💾 Tentative de sauvegarde de la photo:', photo);

    if (!photo) {
      console.log('❌ Aucune photo sélectionnée, abandon');
      return;
    }

    this.saving.set(true);

    try {
      console.log('🚀 Appel de updateUserPhoto avec:', photo);
      const result = await this.authService.updateUserPhoto(photo);
      console.log('📡 Réponse du serveur:', result);

      if (result.success) {
        console.log('✅ Mise à jour réussie');
        this.snackbar.open(result.message, 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.dialogRef.close(true);
      } else {
        console.log('❌ Échec de la mise à jour:', result.message);
        this.snackbar.open(result.message, 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    } catch (error) {
      console.error('💥 Erreur lors de la mise à jour:', error);
      this.snackbar.open('Erreur lors de la mise à jour', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
    } finally {
      this.saving.set(false);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
