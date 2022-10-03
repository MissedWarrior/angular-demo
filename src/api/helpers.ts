import { HttpErrorResponse } from '@angular/common/http';

import { asyncScheduler, Observable, scheduled, throwError } from 'rxjs';

import { ErrorResponse } from './types';

export const handleError = (response: any): Observable<ErrorResponse> | Observable<never> => {
  if (response instanceof HttpErrorResponse) {
    if (response.status === 400) {
      return scheduled([{ errors: response.error }], asyncScheduler);
    } else {
      return throwError(() => response);
    }
  }

  return throwError(() => response);
};
