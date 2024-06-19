// TODO: 에러 스키마 논의 필요
interface ErrorSchema {
  code: number;
  message: string;
}

export class ApiException extends Error {
  declare code: number;

  constructor(data: ErrorSchema) {
    super(data.message);
    this.code = data.code;
    this.name = 'ApiException';
  }
}
