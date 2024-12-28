import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OnlyOneErrorPipe } from '../../pipes/only-one-error.pipe';
import { AppState } from '../../reducers';
import { AuthService } from '../Services/old.auth.service';
import { MustMatch, MustNotMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
    selector: 'app-changepwd',
    templateUrl: './changepwd.component.html',
    styleUrls: ['./changepwd.component.scss'],
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, JsonPipe, OnlyOneErrorPipe]
})
export class ChangepwdComponent implements OnInit {

  // changepwdForm: FormGroup;
  hidePassword = true;
  hidePassword2 = true;
  hidePassword3 = true;

  changepwdForm!: FormGroup;
  // formOptions: AbstractControlOptions = { validators: [ MustMatch('newPassword', 'verifyPassword'), MustNotMatch('oldPassword', 'newPassword') ]};
  // changepwdForm = this.fb.group({
  //         oldPassword: ['', [
  //           Validators.required,
  //           Validators.minLength(8),]],
  //         newPassword: ['', [
  //           Validators.required,
  //           Validators.minLength(8),
  //           createPasswordStrengthValidator(),
  //           ]],
  //         verifyPassword: ['', [Validators.required]]
  //     }, this.formOptions);

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {
      const formOptions: AbstractControlOptions = { validators: [ MustMatch('newPassword', 'verifyPassword'), MustNotMatch('oldPassword', 'newPassword') ]};
      this.changepwdForm = fb.group({
          oldPassword: ['', [
          Validators.required,
          Validators.minLength(8),]],
          newPassword: ['', [
            Validators.required,
            Validators.minLength(8),
            createPasswordStrengthValidator(),
            ]],
          verifyPassword: ['', [Validators.required]]
      }, formOptions);

  }

  ngOnInit(): void {

  }

  get oldPassword() {
    return this.changepwdForm.get('oldPassword');
  }

  get newPassword() {
    return this.changepwdForm.get('newPassword');
  }

  get verifyPassword() {
    return this.changepwdForm.get('verifyPassword');
  }

  changePwd() {}

  backhome() {
    this.router.navigate(['home']);
  }
}
