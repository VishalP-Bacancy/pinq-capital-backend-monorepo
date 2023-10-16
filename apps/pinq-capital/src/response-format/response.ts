export interface ApiResponse<T> {
  status: true | false;
  message: string;
  errorDetails?: string; // Optional error details
  data?: T; // Optional data field
}

export function successResponse<T>(message: string, data?: T): ApiResponse<T> {
  return {
    status: true,
    message,
    data,
  };
}

export function errorResponse<T>(
  message: string,
  data?: T,
  errorDetails?: string,
): ApiResponse<T> {
  return {
    status: false,
    message,
    errorDetails,
    data,
  };
}
