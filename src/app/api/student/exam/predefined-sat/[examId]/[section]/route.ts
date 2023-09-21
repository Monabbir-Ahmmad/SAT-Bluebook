import { NextRequest } from "next/server";
import { SectionTypes } from "@/constants/enums";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";

const getExamSectionByExamId = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { examId, section },
    }: {
      params: { examId: string; section: SectionTypes };
    }
  ) => {
    const searchParams = req.nextUrl.searchParams;

    const score =
      searchParams.get("score") !== null
        ? parseInt(searchParams.get("score") || "0")
        : undefined;

    const questionSet = await examAction.getExamSectionByExamId(examId, section, score);

    return responseHandler(StatusCode.OK, questionSet);
  }
);

export { getExamSectionByExamId as GET };
