import { ValidatorFn } from '@angular/forms';

interface Options {
  customValidationMessage?: (max: number) => string;
}

const defaultMessage = (count: number) => `Field should contain maximum ${count} characters`;

export const maxLength = (max: number, options?: Options): ValidatorFn => control => {
  const message =
    options
      ? typeof options.customValidationMessage === 'function'
        ? options.customValidationMessage(max)
        : defaultMessage(max)
      : defaultMessage(max);

  const value = control.value as string | null;

  if (value && value.length > max) {
    return {
      maxLength: {
        maxPossibleLength: max,
        actualLength: value.length,
        message,
      },
    };
  }

  return null;
};
