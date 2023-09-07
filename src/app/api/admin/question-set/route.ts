import { NextRequest } from "next/server";
import { QuestionSet } from "@/lib/server/models";
import { QuestionSetCreateReqDto } from "@/dtos/question-set.dto";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { questionSetAction } from "@/lib/server/actions";
import { questionSetCreateValidationSchema } from "@/lib/server/validators/question-set.validator";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { validateData } from "@/lib/server/utils/validation.util";

const createQuestionSet = asyncHandler(async (req: NextRequest) => {
  const body = validateData<QuestionSetCreateReqDto>(
    await req.json(),
    questionSetCreateValidationSchema
  );

  const data = await questionSetAction.create(body);

  return responseHandler(StatusCode.OK, data);
});

const getQuestionSet = asyncHandler(async (req: NextRequest) => {
  const section = await QuestionSet.find({}).populate({
    path: "questions",
    select: {
      answers: 0,
    },
  });
  return responseHandler(StatusCode.OK, section);
});

export { createQuestionSet as POST, getQuestionSet as GET };
