import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AvatarBase64Service } from '../../../core/services/avatar-base64.service';
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
    MatIconModule,
    MatProgressSpinnerModule,
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

        <!-- Onglet Upload -->
        <mat-tab label="Upload">
          <div class="p-4">
            <h3 class="mb-4">Télécharger une image :</h3>

            <!-- Zone de drop/sélection -->
            <div class="upload-area"
                 [class.dragover]="isDragOver()"
                 (dragover)="onDragOver($event)"
                 (dragleave)="onDragLeave($event)"
                 (drop)="onDrop($event)"
                 (click)="fileInput.click()"
                 tabindex="0"
                 role="button"
                 (keydown.enter)="fileInput.click()"
                 (keydown.space)="fileInput.click()">
              <div class="upload-content">
                @if (!selectedFile()) {
                  <div class="text-center">
                    <mat-icon class="upload-icon">cloud_upload</mat-icon>
                    <p class="mb-2">Cliquez ou glissez une image ici</p>
                    <p class="text-sm text-gray-500">
                      Formats acceptés: JPEG, PNG, GIF, WebP (max 5MB)
                    </p>
                  </div>
                } @else {
                  <div class="text-center">
                    <p class="mb-2">📁 {{ selectedFile()?.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ formatFileSize(selectedFile()?.size || 0) }}
                    </p>
                    <button mat-button color="warn" (click)="clearSelectedFile($event)">
                      Supprimer
                    </button>
                  </div>
                }
              </div>
            </div>

            <!-- Input file caché -->
            <input
              #fileInput
              type="file"
              accept="image/*"
              style="display: none"
              (change)="onFileSelected($event)"
            />

            <!-- Aperçu de l'upload -->
            @if (previewUrl()) {
              <div class="mt-4">
                <h4>Aperçu :</h4>
                <app-user-avatar
                  [photoUrl]="previewUrl()"
                  cssClass="w-[80px] h-[80px] rounded-full"
                  alt="Aperçu de l'upload"
                />
              </div>
            }

            <!-- Bouton d'upload -->
            @if (selectedFile() && !uploading()) {
              <button
                mat-raised-button
                color="accent"
                class="mt-4 w-full"
                (click)="uploadFile()"
                [disabled]="uploading()"
              >
                Télécharger l'image
              </button>
            }

            @if (uploading()) {
              <div class="mt-4 text-center">
                <mat-progress-spinner
                  diameter="40"
                  mode="indeterminate">
                </mat-progress-spinner>
                <p class="mt-2">Upload en cours...</p>
              </div>
            }
          </div>
        </mat-tab>

        <!-- Onglet Base64 (stockage en DB) -->
        <mat-tab label="Base64 DB">
          <div class="p-4">
            <h3 class="mb-4">Stocker l'image en base de données :</h3>
            <p class="text-sm text-gray-600 mb-4">
              L'image sera convertie en base64 et stockée directement en base.
            </p>

            <!-- Zone de drop/sélection pour base64 -->
            <div class="upload-area"
                 [class.dragover]="isDragOver()"
                 (dragover)="onDragOver($event)"
                 (dragleave)="onDragLeave($event)"
                 (drop)="onDropBase64($event)"
                 (click)="fileInputBase64.click()"
                 tabindex="0"
                 role="button"
                 (keydown.enter)="fileInputBase64.click()"
                 (keydown.space)="fileInputBase64.click()">
              <div class="upload-content">
                @if (!selectedFileBase64()) {
                  <div class="text-center">
                    <mat-icon class="upload-icon">storage</mat-icon>
                    <p class="mb-2">Cliquez ou glissez une image ici</p>
                    <p class="text-sm text-gray-500">
                      L'image sera stockée en base64 dans la base de données
                    </p>
                  </div>
                } @else {
                  <div class="text-center">
                    <p class="mb-2">📁 {{ selectedFileBase64()?.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ formatFileSize(selectedFileBase64()?.size || 0) }}
                    </p>
                    @if (base64Preview()) {
                      <div class="mt-2">
                        <app-user-avatar
                          [photoUrl]="base64Preview()"
                          cssClass="w-[60px] h-[60px] rounded-full mx-auto"
                          alt="Aperçu base64"
                        />
                      </div>
                    }
                    <button mat-button color="warn" (click)="clearSelectedFileBase64($event)">
                      Supprimer
                    </button>
                  </div>
                }
              </div>
            </div>

            <!-- Input file caché pour base64 -->
            <input
              #fileInputBase64
              type="file"
              accept="image/*"
              (change)="onFileSelectedBase64($event)"
              style="display: none"
            />

            @if (isUploadingBase64()) {
              <div class="text-center mt-4">
                <mat-progress-spinner
                  diameter="40"
                  mode="indeterminate">
                </mat-progress-spinner>
                <p class="mt-2">Upload en cours...</p>
              </div>
            }
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

    .upload-area {
      border: 2px dashed var(--mat-sys-outline);
      border-radius: 8px;
      padding: 32px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: var(--mat-sys-surface-variant);
    }

    .upload-area:hover {
      border-color: var(--mat-sys-primary);
      background-color: var(--mat-sys-primary-container);
    }

    .upload-area.dragover {
      border-color: var(--mat-sys-primary);
      background-color: var(--mat-sys-primary-container);
      border-style: solid;
    }

    .upload-content {
      pointer-events: none;
    }

    .upload-icon {
      font-size: 48px;
      color: var(--mat-sys-primary);
      margin-bottom: 16px;
    }
  `
})
export class ProfileEditorComponent {
  authService = inject(AuthService);
  snackbar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<ProfileEditorComponent>);
  avatarBase64Service = inject(AvatarBase64Service);

  selectedPhoto = signal<string>('');
  imageUrl = signal<string>('');
  saving = signal<boolean>(false);
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string>('');
  uploading = signal<boolean>(false);
  isDragOver = signal<boolean>(false);

  // Signaux pour Base64
  selectedFileBase64 = signal<File | null>(null);
  base64Preview = signal<string>('');
  isUploadingBase64 = signal<boolean>(false);

  // Validation des fichiers
  readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

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

  // === MÉTHODES POUR L'UPLOAD DE FICHIERS ===

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  private handleFile(file: File) {
    // Validation du type de fichier
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.snackbar.open('Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WebP.', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    // Validation de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      this.snackbar.open('Fichier trop volumineux. Maximum 5MB autorisé.', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    this.selectedFile.set(file);
    this.createPreview(file);
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.previewUrl.set(result);
      this.selectedPhoto.set(result); // Sélectionner automatiquement l'aperçu
    };
    reader.readAsDataURL(file);
  }

  clearSelectedFile(event: Event) {
    event.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set('');
    if (this.selectedPhoto() === this.previewUrl()) {
      this.selectedPhoto.set('');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Méthodes pour Base64
  onFileSelectedBase64(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.handleFileBase64(files[0]);
    }
  }

  onDropBase64(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileBase64(files[0]);
    }
  }

  private handleFileBase64(file: File) {
    // Validation du type de fichier
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      this.snackbar.open('Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WebP.', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    // Validation de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      this.snackbar.open('Fichier trop volumineux. Maximum 5MB autorisé.', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }

    this.selectedFileBase64.set(file);

    // Convertir en base64 pour l'aperçu
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.base64Preview.set(base64String);
      this.selectedPhoto.set(base64String); // Préparer la photo pour sauvegarde via le bouton
    };
    reader.readAsDataURL(file);
  }  private uploadToBase64(base64Data: string) {
    this.isUploadingBase64.set(true);

    this.avatarBase64Service.uploadAvatarBase64(base64Data).subscribe({
      next: () => {
        this.isUploadingBase64.set(false);
        this.selectedPhoto.set(base64Data); // Utiliser le base64 comme photo sélectionnée
        this.snackbar.open('Avatar sauvegardé en base de données avec succès !', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        this.isUploadingBase64.set(false);
        console.error('Erreur upload base64:', error);
        this.snackbar.open('Erreur lors de la sauvegarde', 'Fermer', {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }

  clearSelectedFileBase64(event: Event) {
    event.stopPropagation();
    this.selectedFileBase64.set(null);
    this.base64Preview.set('');
    if (this.selectedPhoto() === this.base64Preview()) {
      this.selectedPhoto.set('');
    }
  }

  async uploadFile() {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // TODO: Remplacer par l'URL de votre endpoint d'upload
      const response = await fetch('http://localhost:3100/api/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authService.authToken()}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('📤 Upload réussi:', result);

        // Utiliser l'URL retournée par le serveur
        this.selectedPhoto.set(result.url);
        this.snackbar.open('Image uploadée avec succès !', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
      } else {
        throw new Error('Upload échoué');
      }
    } catch (error) {
      console.error('💥 Erreur lors de l\'upload:', error);
      this.snackbar.open('Erreur lors de l\'upload de l\'image', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
    } finally {
      this.uploading.set(false);
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
      // Détecter si c'est du base64 (commence par data:image/)
      if (photo.startsWith('data:image/')) {
        console.log('�️ Sauvegarde base64 en base de données');

        this.avatarBase64Service.uploadAvatarBase64(photo).subscribe({
          next: async () => {
            console.log('✅ Mise à jour base64 réussie');
            
            // 🔄 Actualiser le profil utilisateur pour récupérer la nouvelle photoUrl
            await this.authService.refreshUserProfile();
            
            this.saving.set(false);
            this.snackbar.open('Avatar sauvegardé en base de données avec succès !', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top'
            });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.log('❌ Échec de la mise à jour base64:', error);
            this.saving.set(false);
            this.snackbar.open('Erreur lors de la sauvegarde en base de données', 'Fermer', {
              duration: 5000,
              verticalPosition: 'top'
            });
          }
        });
      } else {
        // Utiliser l'ancienne méthode pour les autres types (emoji, URL)
        console.log('�🚀 Appel de updateUserPhoto avec:', photo);
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
      }
    } catch (error) {
      console.error('💥 Erreur lors de la mise à jour:', error);
      this.snackbar.open('Erreur lors de la mise à jour', 'Fermer', {
        duration: 5000,
        verticalPosition: 'top'
      });
      this.saving.set(false);
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
