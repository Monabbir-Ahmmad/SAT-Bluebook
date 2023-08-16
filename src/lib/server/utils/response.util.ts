import { HttpError } from "./httpError";
import { NextResponse } from "next/server";
import { StatusCode } from "@/constants/status-code";

export const sendResponse = (status: number, data: any, res = NextResponse) => {
  return res.json(data, {
    status,
  });
};

export const sendError = (err: Error | HttpError) => {
  if (err instanceof HttpError) {
    return sendResponse(err.statusCode, {
      message: err.message,
    });
  }

  return sendResponse(StatusCode.INTERNAL_SERVER_ERROR, {
    message: err.message,
  });
};
