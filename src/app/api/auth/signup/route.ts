import { sendResponse } from "@/lib/server/utils/response.util";

import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { authAction } from "@/lib/server/actions";
import { signupRouteValidator } from "@/lib/server/validators/auth.validator";
import { asyncHandler } from "@/lib/server/utils/async.handler";

const signup = asyncHandler(async (req: NextRequest) => {
  const body: RegisterReqDTO = await req.json();

  const data = await authAction.register(body);

  return sendResponse(StatusCode.OK, data);
}, signupRouteValidator);

export { signup as POST };
