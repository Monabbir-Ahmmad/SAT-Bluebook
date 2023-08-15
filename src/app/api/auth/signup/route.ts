import { NextRequest } from "next/server";

import { StatusCode } from "@/constants/status-code";
import connectDB from "@/lib/server/config/connect-db";
import { authAction } from "@/lib/server/actions";
import { sendError, sendResponse } from "@/lib/server/utils/response.util";

connectDB();

const signup = async (req: NextRequest) => {
  const { name, email, password, confirmPassword } = await req.json();

  try {
    const result = await authAction.register({
      name,
      email,
      password,
      confirmPassword,
    });

    return sendResponse(StatusCode.OK, result);
  } catch (error: any) {
    return sendError(error);
  }
};

export { signup as POST };
