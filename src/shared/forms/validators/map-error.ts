export interface ValidationError {
  [key: string]: {
    message: string;
  };
}

export const mapError = (errors: ValidationError): string | null => {
  const keys = Object.keys(errors);

  if (keys.length === 0) {
    return null;
  }

  return errors[keys[0]].message;
};
