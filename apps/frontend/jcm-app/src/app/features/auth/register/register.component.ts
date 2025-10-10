import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AppStore } from '../../../appstore/app.store';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  appStore = inject(AppStore);
  router = inject(Router);

  hidePassword = signal(true);

  // Signal Forms API - FormGroup avec des signaux
  registerForm = new FormGroup({
    email: new FormControl('user2@test.be', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('Pwd!123456', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true
    }),
    confirmPassword: new FormControl('Pwd!123456', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  // Signaux convertis à partir des observables du formulaire avec toSignal
  email = toSignal(this.registerForm.controls.email.valueChanges, {
    initialValue: this.registerForm.controls.email.value
  });
  password = toSignal(this.registerForm.controls.password.valueChanges, {
    initialValue: this.registerForm.controls.password.value
  });
  confirmPassword = toSignal(this.registerForm.controls.confirmPassword.valueChanges, {
    initialValue: this.registerForm.controls.confirmPassword.value
  });

  // Signal pour l'état de validation du formulaire
  formStatus = toSignal(this.registerForm.statusChanges, {
    initialValue: this.registerForm.status
  });

  // Signal pour toutes les valeurs du formulaire
  formValue = toSignal(this.registerForm.valueChanges, {
    initialValue: this.registerForm.value
  });

  // Signal computed pour vérifier si les mots de passe correspondent
  passwordsMatch = computed(() => {
    const pwd = this.password();
    const confirmPwd = this.confirmPassword();
    return pwd === confirmPwd && pwd.length > 0 && confirmPwd.length > 0;
  });

  // Signal computed pour l'état du formulaire
  isFormValid = computed(() =>
    this.formStatus() === 'VALID' && this.passwordsMatch()
  );

  // Signal computed pour les erreurs de validation
  emailErrors = computed(() => ({
    required: this.registerForm.controls.email.hasError('required'),
    email: this.registerForm.controls.email.hasError('email')
  }));

  passwordErrors = computed(() => ({
    required: this.registerForm.controls.password.hasError('required'),
    minlength: this.registerForm.controls.password.hasError('minlength')
  }));

  confirmPasswordErrors = computed(() => ({
    required: this.registerForm.controls.confirmPassword.hasError('required'),
    mismatch: !this.passwordsMatch() && this.confirmPassword().length > 0
  }));

  // Signal computed pour la force du mot de passe
  passwordStrength = computed(() => {
    const pwd = this.password();
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    return {
      score: strength,
      label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength] || 'Very Weak',
      color: ['red', 'orange', 'yellow', 'lightgreen', 'green'][strength] || 'red'
    };
  });

  // Signal computed pour le statut global du formulaire
  formSummary = computed(() => ({
    isValid: this.isFormValid(),
    hasErrors: this.formStatus() === 'INVALID',
    passwordMatch: this.passwordsMatch(),
    emailValid: !this.emailErrors().email && !this.emailErrors().required,
    passwordStrong: this.passwordStrength().score >= 3,
    canSubmit: this.isFormValid()
  }));

  // Signal de debug (à supprimer en production)
  debugInfo = computed(() => ({
    formStatus: this.formStatus(),
    formValue: this.formValue(),
    emailValue: this.email(),
    passwordValue: this.password().replace(/./g, '*'), // Masquer le mot de passe
    confirmPasswordValue: this.confirmPassword().replace(/./g, '*'),
    passwordStrength: this.passwordStrength(),
    isValid: this.isFormValid(),
    errors: {
      email: this.emailErrors(),
      password: this.passwordErrors(),
      confirmPassword: this.confirmPasswordErrors()
    }
  }));

  constructor() {
    // Charger le brouillon au démarrage
    this.loadDraft();

    // Sauvegarde automatique à chaque changement d'email
    this.registerForm.controls.email.valueChanges.subscribe(() => {
      this.saveDraft();
    });
  }

  register() {
    if (this.isFormValid()) {
      this.appStore.register(this.email(), this.password(), this.confirmPassword());
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  cancel() {
    this.router.navigate(['home']);
  }

  // Méthodes utilitaires pour réinitialiser les champs
  resetForm() {
    this.registerForm.reset({
      email: '',
      password: '',
      confirmPassword: ''
    });
    localStorage.removeItem('register-draft');
  }

  // Méthode pour marquer tous les champs comme touchés
  markAllAsTouched() {
    this.registerForm.markAllAsTouched();
  }

  // Sauvegarde automatique du brouillon
  saveDraft() {
    const draft = {
      email: this.email(),
      // Ne pas sauvegarder les mots de passe pour des raisons de sécurité
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('register-draft', JSON.stringify(draft));
  }

  // Charger le brouillon sauvegardé
  loadDraft() {
    const saved = localStorage.getItem('register-draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        if (draft.email) {
          this.registerForm.patchValue({ email: draft.email });
        }
      } catch (error) {
        console.warn('Could not load draft:', error);
      }
    }
  }

  // Getters pour un accès facile aux contrôles (pour le template)
  get emailControl() {
    return this.registerForm.controls.email;
  }

  get passwordControl() {
    return this.registerForm.controls.password;
  }

  get confirmPasswordControl() {
    return this.registerForm.controls.confirmPassword;
  }
}
