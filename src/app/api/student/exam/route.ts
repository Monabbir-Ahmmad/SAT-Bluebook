import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { examAction } from "@/lib/server/actions";
import { sendResponse } from "@/lib/server/utils/response.util";

const getQuestionSet = asyncHandler(async (req: NextRequest) => {
  const section = await examAction.getQuestionSet();

  return sendResponse(StatusCode.OK, section);
});

export { getQuestionSet as GET };
