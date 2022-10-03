import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { asyncScheduler, catchError, map, scheduled } from 'rxjs';

import { UserData, UserInfo, UserRegInfo } from './signup.types';
import { ResponseWithValidationError } from './types';
import { handleError } from './helpers';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private EMAIL_CODE = '123456';

  constructor(private http: HttpClient) {}

  signup(userData: UserData): ResponseWithValidationError<UserRegInfo> {
    const response = { email: userData.email };

    return scheduled([{ data: response }], asyncScheduler);
  }

  confirmEmail(email: string, code: string): ResponseWithValidationError<UserInfo> {
    if (code === this.EMAIL_CODE) {
      return this.http.get<UserInfo>('https://randomuser.me/api/').pipe(
        map(item => ({ data: item })),
        catchError(handleError),
      );
    } else {
      return scheduled([{
        errors: {
          confirm: {
            message: 'Wrong code',
          },
        },
      }], asyncScheduler);
    }
  }
}
