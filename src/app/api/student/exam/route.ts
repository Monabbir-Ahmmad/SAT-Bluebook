import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { ExamSectionSubmitDto } from "@/dtos/exam.dto";

const verifyExamSection = asyncHandler(async (req: NextRequest) => {
  const data: ExamSectionSubmitDto = await req.json();

  const result = await examAction.verifyExamSection(data);

  return responseHandler(StatusCode.OK, result);
});

export { verifyExamSection as POST };
