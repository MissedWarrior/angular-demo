import { Observable } from 'rxjs';

export interface ErrorResponse {
  data?: null;
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

interface DataResponse<T> {
  data: T;
  errors?: null;
}

export type ResponseWithValidationError<T> = Observable<DataResponse<T> | ErrorResponse>;
