import { NextRequest } from "next/server";
import { QuestionCreateReqDto } from "@/dtos/question.dto";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { questionAction } from "@/lib/server/actions";
import { questionCreateValidationSchema } from "@/lib/server/validators/question.validator";
import { sendResponse } from "@/lib/server/utils/response.util";
import { validateData } from "@/lib/server/utils/validation.util";

const createQuestion = asyncHandler(async (req: NextRequest) => {
  const body = validateData<QuestionCreateReqDto>(
    await req.json(),
    questionCreateValidationSchema
  );

  const data = await questionAction.create(body);

  return sendResponse(StatusCode.OK, data);
});

const getQuestions = asyncHandler(async (req: NextRequest) => {
  const section = req.nextUrl.searchParams.get("section");

  const data = await questionAction.getQuestions(section);

  return sendResponse(StatusCode.OK, data);
});

export { createQuestion as POST, getQuestions as GET };
