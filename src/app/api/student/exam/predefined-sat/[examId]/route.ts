import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { examAction } from "@/lib/server/actions";
import { getServerSession } from "next-auth";
import { responseHandler } from "@/lib/server/utils/response.handler";

const startExamById = asyncHandler(
  async (
    req: NextRequest,
    {
      params: { examId },
    }: {
      params: { examId: string };
    }
  ) => {
    const session = await getServerSession(authOptions);

    const questionSet = await examAction.startExamById(
      examId,
      session?.user.id!
    );

    return responseHandler(StatusCode.OK, questionSet);
  }
);

export { startExamById as GET };
