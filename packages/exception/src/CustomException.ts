type CustomErrorCode = 'NETWORK_ERROR' | 'NETWORK_TIMEOUT' | 'UNKNOWN_ERROR' | 'API_TYPE_NOT_MATCH' | 'TOKEN_EXPIRED';

const ERROR_MESSAGE: Record<CustomErrorCode, string> = {
  NETWORK_ERROR: '네트워크 에러',
  NETWORK_TIMEOUT: '네트워크 타임아웃',
  UNKNOWN_ERROR: '알 수 없는 에러',
  API_TYPE_NOT_MATCH: 'API 응답 타입 불일치',
  TOKEN_EXPIRED: '토큰 만료',
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
