import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SignupService } from '@/api/signup.service';
import { StorageService } from '@/shared/storage/storage.service';
import {
  required,
  maxLength,
  minLength,
  pattern,
  mapError,
  ValidationError,
} from '@/shared/forms/validators';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form = this.fb.group({
    email: ['',
      [
        required(),
        pattern({
          pattern: new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
          validationMessage: 'Enter a valid email',
        }),
      ],
    ],
    pass: ['',
      [
        required(),
        maxLength(20),
        minLength(6),
        pattern({
          pattern: new RegExp(/^[a-zA-Z1-9]+$/g),
          validationMessage: 'You can only use symbols of english alphabet and digits',
        }),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private storage: StorageService,
    private router: Router,
  ) {}

  errorMap(error: ValidationError) {
    return mapError(error);
  }

  submit() {
    const form = this.form;
    if (form.valid) {
      this.signupService.signup({ email: form.value.email!, pass: form.value.pass! })
        .subscribe(response => {
          if (response.data) {
            this.storage.setStringValue('email', response.data.email, 'sessionStorage');
            this.router.navigateByUrl('signup/email-confirmation');
          }

          if (response.errors) {
            return Object.keys(response.errors).forEach(item => {
              const control = this.form.get(item);
              control?.setErrors({ server: response.errors[item] });
              control?.valueChanges.pipe(take(1)).subscribe(() => {
                control?.setErrors(null);
              });
            });
          }
        });
    }
  }
}
