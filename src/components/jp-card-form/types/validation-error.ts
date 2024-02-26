export interface IValidationError {
  value: string;
  msg: string;
}

export type TValidationError = IValidationError | undefined;
