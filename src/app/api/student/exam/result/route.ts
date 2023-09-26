import { ExamSectionResultDto } from "@/dtos/exam.dto";
import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { examAction } from "@/lib/server/actions";
import { getServerSession } from "next-auth";
import { responseHandler } from "@/lib/server/utils/response.handler";

const submitExamResult = asyncHandler(async (req: NextRequest) => {
  const examId = req.nextUrl.searchParams.get("examId");

  const data: ExamSectionResultDto[] = await req.json();

  const session = await getServerSession(authOptions);

  const result = await examAction.submitExamResult(
    session?.user?.id!,
    data,
    examId
  );

  return responseHandler(StatusCode.OK, result);
});

const getExamResults = asyncHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  const result = await examAction.getExamResults(session?.user?.id!);

  return responseHandler(StatusCode.OK, result);
});

export { submitExamResult as POST, getExamResults as GET };
