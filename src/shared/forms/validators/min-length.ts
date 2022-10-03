import { ValidatorFn } from '@angular/forms';

interface Options {
  customValidationMessage?: (min: number) => string;
}

const defaultMessage = (count: number) => `Field should contain minimum ${count} characters`;

export const minLength = (min: number, options?: Options): ValidatorFn => control => {
  const message =
    options
      ? typeof options.customValidationMessage === 'function'
        ? options.customValidationMessage(min)
        : defaultMessage(min)
      : defaultMessage(min);

  const value = control.value as string | null;

  if (value && value.length < min) {
    return {
      minLength: {
        minPossibleLength: min,
        actualLength: value.length,
        message,
      },
    };
  }

  return null;
};
