import { ExamSectionResultDto } from "@/dtos/exam.dto";
import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const submitExamResult = asyncHandler(async (req: NextRequest) => {
  const data: ExamSectionResultDto[] = await req.json();

  const session = await getServerSession(authOptions);

  const result = await examAction.submitExamResult(session?.user?.id!, data);

  return responseHandler(StatusCode.OK, result);
});

export { submitExamResult as POST };
