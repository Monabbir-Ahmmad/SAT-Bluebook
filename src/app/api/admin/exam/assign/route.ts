import { StatusCode } from "@/constants/status-code";
import { ExamAssignReqDto } from "@/dtos/exam.dto";
import { examAction } from "@/lib/server/actions";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { NextRequest } from "next/server";

const assignExam = asyncHandler(async (req: NextRequest) => {
  const body: ExamAssignReqDto = await req.json();

  const data = await examAction.assignExam(body);
  return responseHandler(StatusCode.OK, data);
});

export { assignExam as POST };
