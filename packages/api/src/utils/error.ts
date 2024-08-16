export class CustomError extends Error {
  public statusCode: number;
  public errorCode?: string;
  public details?: any;

  constructor(message: string, statusCode: number, errorCode?: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
    this.errorCode = errorCode;
    this.details = details;
  }
}
