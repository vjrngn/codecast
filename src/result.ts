interface ResultError {
  message: string;
  code?: string;
  description?: string;
  error?: Error;
}

export class Result<T> {
  readonly data: T | null;
  readonly error: ResultError | null;

  constructor(data: T | null, error: ResultError | null) {
    this.data = data;
    this.error = error;
  }
}
