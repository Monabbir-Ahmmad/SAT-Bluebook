import { NextRequest } from "next/server";
import { validateRequest } from "./validation.util";
import { sendError } from "./response.util";

export type AsyncHandler = (req: NextRequest, ...args: any[]) => Promise<any>;

export const asyncHandler = (handler: AsyncHandler, schema: any) => {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      if (schema) validateRequest(await req.json(), schema);

      return await handler(req, ...args);
    } catch (error: any) {
      return sendError(error);
    }
  };
};
