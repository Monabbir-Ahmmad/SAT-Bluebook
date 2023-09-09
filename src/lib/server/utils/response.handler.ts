import { HttpError } from "./httpError";
import { NextResponse } from "next/server";
import { StatusCode } from "@/constants/status-code";

export const responseHandler = <T>(
  status: number,
  data: T,
  res = NextResponse
) => {
  return res.json(data, {
    status,
  });
};

export const errorResponseHandler = (err: Error | HttpError) => {
  if (err instanceof HttpError) {
    return responseHandler(err.statusCode, {
      message: err.message,
    });
  }

  return responseHandler(StatusCode.INTERNAL_SERVER_ERROR, {
    message: err.message,
  });
};
