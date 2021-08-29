import { AxiosError } from "axios";

export const HANDLE_ERROR = "[NOTIFIER] HANDLE_ERROR";

export const handleError = (error: AxiosError | Error, options: { message?: string } = {}) => ({
  type: HANDLE_ERROR,
  payload: { error, message: options.message || error.message }
});
