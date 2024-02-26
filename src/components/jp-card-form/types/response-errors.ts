import { IStatusResponse } from './response';
import { TValidationError } from './validation-error';

export interface IFormCardError extends IStatusResponse {
  errors: {
    japanese?: TValidationError;
    english?: TValidationError;
    kana?: TValidationError;
    progressive?: TValidationError;
    romaji?: TValidationError;
    level?: TValidationError;
    date?: TValidationError;
  };
}
