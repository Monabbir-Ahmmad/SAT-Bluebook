import { ExamCreateReqDto } from "@/dtos/exam.dto";
import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { examCreateValidationSchema } from "@/lib/server/validators/exam.validator";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { validateData } from "@/lib/server/utils/validation.util";

const createExam = asyncHandler(async (req: NextRequest) => {
  const body = validateData<ExamCreateReqDto>(
    await req.json(),
    examCreateValidationSchema
  );

  const data = await examAction.createExam(body);
  return responseHandler(StatusCode.OK, data);
});

const getExamList = asyncHandler(async (req: NextRequest) => {
  const data = await examAction.getExamList();
  return responseHandler(StatusCode.OK, data);
});

export { createExam as POST, getExamList as GET };
