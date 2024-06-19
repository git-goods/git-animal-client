type CustomErrorCode = 'NETWORK_ERROR' | 'NETWORK_TIMEOUT' | 'UNKNOWN_ERROR';

const ERROR_MESSAGE: Record<CustomErrorCode, string> = {
  NETWORK_ERROR: 'Network error',
  NETWORK_TIMEOUT: 'Network timeout',
  UNKNOWN_ERROR: 'Unknown error',
};

export class CustomException extends Error {
  declare code: CustomErrorCode;

  constructor(code: CustomErrorCode, message?: string) {
    const errorMessage = message || ERROR_MESSAGE[code];

    super(errorMessage);
    this.name = 'CustomException';
    this.code = code;
  }
}
