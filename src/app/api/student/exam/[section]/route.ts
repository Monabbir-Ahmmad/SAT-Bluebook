import { NextRequest } from "next/server";
import { SectionTypes } from "@/constants/enums";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";

const getExamSection = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { section },
    }: {
      params: { section: SectionTypes };
    }
  ) => {
    const score = parseInt(req.nextUrl.searchParams.get("score") || "-1");

    const questionSet = await examAction.getExamSection(section, score);

    return responseHandler(StatusCode.OK, questionSet);
  }
);

export { getExamSection as GET };
