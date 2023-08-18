import { NextRequest, NextResponse } from "next/server";

import { Question } from "@/lib/server/models";
import connectDB from "@/lib/server/config/connect-db";
import { questionCreateValidationSchema } from "@/lib/server/validators/question.validator";
import { storeBase64AsFile } from "@/lib/server/utils/file.util";
import { validateData } from "@/lib/server/utils/validation.util";

connectDB();

const createQuestion = async (req: NextRequest) => {
  const body = validateData<QuestionCreateReqDTO>(
    await req.json(),
    questionCreateValidationSchema
  );

  if (body.questionImage)
    body.questionImage = await storeBase64AsFile(body.questionImage);

  for (let i = 0; i < body.options.length; i++) {
    if (body.options[i].image)
      body.options[i].image = await storeBase64AsFile(body.options[i].image!);
  }

  const question = await Question.create(body);

  return NextResponse.json(question);
};

export { createQuestion as POST };
