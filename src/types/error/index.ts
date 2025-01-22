interface InvalidParam {
  field: string;
  message: string;
}

export interface ErrorResponse {
  error: {
    message: string;
    invalidParams?: InvalidParam[];
  };
}
