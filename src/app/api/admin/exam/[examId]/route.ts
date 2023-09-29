import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";

const getExam = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { examId },
    }: {
      params: { examId: string };
    }
  ) => {
    const data = await examAction.getExamById(examId);
    return responseHandler(StatusCode.OK, data);
  }
);

export { getExam as GET };
