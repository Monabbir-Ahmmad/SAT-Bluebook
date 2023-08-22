import { NextRequest } from "next/server";
import { QuestionCreateReqDTO } from "@/dtos/question.dto";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import connectDB from "@/lib/server/config/connect-db";
import { questionAction } from "@/lib/server/actions";
import { questionCreateValidationSchema } from "@/lib/server/validators/question.validator";
import { sendResponse } from "@/lib/server/utils/response.util";
import { validateData } from "@/lib/server/utils/validation.util";

connectDB();

const createQuestion = asyncHandler(async (req: NextRequest) => {
  const body = validateData<QuestionCreateReqDTO>(
    await req.json(),
    questionCreateValidationSchema
  );

  const data = await questionAction.create(body);

  return sendResponse(StatusCode.OK, data);
});

export { createQuestion as POST };
