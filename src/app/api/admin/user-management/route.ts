import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { userAction } from "@/lib/server/actions";

const getUserList = asyncHandler(async (req: NextRequest) => {
  const users = await userAction.findAll();

  return responseHandler(StatusCode.OK, users);
});

export { getUserList as GET };
