import { NextRequest } from "next/server";
import { RegisterReqDto } from "@/dtos/auth.dto";
import { StatusCode } from "@/constants/status-code";
import { asyncHandler } from "@/lib/server/utils/async.handler";
import { authAction } from "@/lib/server/actions";
import { responseHandler } from "@/lib/server/utils/response.handler";
import { signupValidationSchema } from "@/lib/server/validators/auth.validator";
import { validateData } from "@/lib/server/utils/validation.util";

const signup = asyncHandler(async (req: NextRequest) => {
  const body = validateData<RegisterReqDto>(
    await req.json(),
    signupValidationSchema
  );

  const data = await authAction.register(body);

  return responseHandler(StatusCode.OK, data);
});

export { signup as POST };
