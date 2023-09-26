import { NextRequest } from "next/server";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { examAction } from "@/lib/server/actions";
import { getServerSession } from "next-auth";
import { responseHandler } from "@/lib/server/utils/response.handler";

const getAvailableExams = asyncHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  const exams = await examAction.getAssignedExams(session?.user.id!);

  return responseHandler(StatusCode.OK, exams);
});

export { getAvailableExams as GET };
