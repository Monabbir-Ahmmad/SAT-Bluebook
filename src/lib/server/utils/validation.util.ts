import { HttpError } from "./httpError";
import { StatusCode } from "@/constants/status-code";
import { z } from "zod";

export function validateRequest<T>(
  data: T,
  schema: z.ZodObject<z.ZodRawShape>
): T | never {
  const validationResult = schema.safeParse(data);

  if (validationResult.success) return <T>validationResult.data;

  const errorMessages = validationResult.error.errors.map((err) => err.message);

  throw new HttpError(StatusCode.BAD_REQUEST, errorMessages.join("\n"));
}
