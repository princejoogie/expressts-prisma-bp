import { ErrorResponse, ErrorType } from "./types";

export class AppError extends Error {
  private statusCode: number;

  private errorType: keyof typeof ErrorType;

  constructor(errorType: keyof typeof ErrorType, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = ErrorType[errorType];
    this.errorType = errorType;
  }

  get StatusCode() {
    return this.statusCode;
  }

  get JSON(): ErrorResponse {
    return {
      message: this.message,
      statusCode: this.statusCode,
      type: this.errorType,
    };
  }
}
