import { AbstractControl, ValidatorFn } from '@angular/forms';

interface Options {
  pattern: RegExp;
  validationMessage: string;
}

export const pattern = (options: Options): ValidatorFn =>
  (control: AbstractControl) => {
    const message = options.validationMessage;
    const value = control.value as string | null ?? '';

    if (!value.match(options.pattern)) {
      return {
        pattern: {
          message,
          pattern: options.pattern,
        }
      }
    }

    return null;
  };
