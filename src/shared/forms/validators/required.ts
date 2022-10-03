import { AbstractControl, ValidatorFn } from '@angular/forms';

interface Options {
  trimWhitespaces?: boolean;
  customValidationMessage?: string | null;
}

const defaultMessage = 'Field is required';

export const required = (options?: Options): ValidatorFn =>
  (control: AbstractControl) => {
    const message = options?.customValidationMessage ?? defaultMessage;

    if (typeof control.value === 'string') {
      const trimWhitespaces = options?.trimWhitespaces ?? true;
      const length = trimWhitespaces ? control.value.trim().length : control.value.length;

      return length > 0 ? null : {
        required: {
          message,
        }
      };
    } else if (Array.isArray(control.value)) {
      return control.value.length > 0 ? null : {
        required: {
          message,
        }
      };
    }

    throw new Error('Non-string and non-array values are not supported in required validator');
  };
