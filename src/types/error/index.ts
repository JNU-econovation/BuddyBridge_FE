export interface ErrorResponse {
  error: {
    message: string;
    invalidParams?: [
      {
        message: string;
      },
    ];
  };
}
