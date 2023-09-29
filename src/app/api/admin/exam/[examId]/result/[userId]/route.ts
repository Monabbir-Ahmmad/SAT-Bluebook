import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";

const getExamResultByUserId = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { examId, userId },
    }: {
      params: { examId: string; userId: string };
    }
  ) => {
    const data = await examAction.getExamResultByUserId(userId, examId);
    return responseHandler(StatusCode.OK, data);
  }
);

export { getExamResultByUserId as GET };
