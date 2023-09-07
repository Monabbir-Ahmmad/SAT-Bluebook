import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { userAction } from "@/lib/server/actions";

const updateAdminRole = asyncHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: {
        userId: string;
      };
    }
  ) => {
    const { userId } = params;
    const user = await userAction.updateAdminRole(userId);

    return responseHandler(StatusCode.OK, user);
  }
);

export { updateAdminRole as PATCH };
