import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '@/shared/storage/storage.service';
import { User } from '@/api/signup.types';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss'],
})
export class SignupSuccessComponent {
  email = this.storage.getStringValue('email', 'sessionStorage');

  user = this.storage.getSerializableValue<User>('userInfo')!;

  constructor(
    private storage: StorageService,
    private router: Router,
  ) {
    if (!this.email || !this.user) {
      this.router.navigateByUrl('/signup');
    }
  }
}
