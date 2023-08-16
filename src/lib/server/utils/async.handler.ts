import { sendError } from "./response.util";

export function asyncHandler(callback: Function) {
  return async (...args: any[]) => {
    try {
      return await callback(...args);
    } catch (error: any) {
      console.error(error);
      return sendError(error);
    }
  };
}
