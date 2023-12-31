import connectDB from "../config/connect-db";
import { errorResponseHandler } from "./response.handler";

export function asyncHandler(callback: Function) {
  return async (...args: any[]) => {
    try {
      await connectDB();

      return await callback(...args);
    } catch (error: any) {
      console.error(error);
      return errorResponseHandler(error);
    }
  };
}
