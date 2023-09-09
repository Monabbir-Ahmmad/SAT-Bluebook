import { StatusCode } from "@/constants/status-code";
import { examAction } from "@/lib/server/actions";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { NextRequest } from "next/server";

const getExamSection = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { examId },
    }: {
      params: { examId: string };
    }
  ) => {
    const questionSet = await examAction.getExamResult(examId);

    return responseHandler(StatusCode.OK, questionSet);
  }
);

export { getExamSection as GET };
