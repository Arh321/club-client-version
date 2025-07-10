export interface IHttpResult<T> {
  status: boolean;
  result: T;
  error: unknown;
  errors: unknown;
  statusCode: number;
  statusMessage: string;
  resultMessage: string;
}
