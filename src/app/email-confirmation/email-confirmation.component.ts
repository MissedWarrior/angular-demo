import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { StorageService } from '@/shared/storage/storage.service';
import { mapError, required, ValidationError } from '@/shared/forms/validators';
import { SignupService } from '@/api/signup.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent {
  email = this.storage.getStringValue('email', 'sessionStorage');

  form = this.fb.group({
    code: ['', [required()]],
  });

  constructor(
    private storage: StorageService,
    private router: Router,
    private fb: FormBuilder,
    private signupService: SignupService,
  ) {
    if (!this.email) {
      this.router.navigateByUrl('/signup');
    }
  }

  errorMap(error: ValidationError) {
    return mapError(error);
  }

  submit() {
    if (this.form.valid) {
      this.signupService.confirmEmail(this.email!, this.form.controls.code.value!).subscribe(response => {
        if (response.errors) {
          return Object.keys(response.errors).forEach(item => {
            const control = this.form.get(item);
            control?.setErrors({ server: response.errors[item] });
            control?.valueChanges.pipe(take(1)).subscribe(() => {
              control?.setErrors(null);
            });
          });
        }

        this.storage.setSerializableValue('userInfo', response.data.results[0]);
        this.router.navigateByUrl('/signup/success');
      });
    }
  }
}
