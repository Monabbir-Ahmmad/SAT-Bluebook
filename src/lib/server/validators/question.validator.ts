import { Difficulties, OptionTypes, SubjectTypes } from "@/constants/enums";

import { z } from "zod";

export const questionCreateValidationSchema = z
  .object({
    question: z.string().min(1),
    passage: z.string().optional(),
    questionImage: z.string().optional(),
    subject: z.nativeEnum(SubjectTypes),
    difficulty: z.nativeEnum(Difficulties),
    tags: z.array(z.string()).min(1),
    optionType: z.nativeEnum(OptionTypes),
    options: z
      .array(
        z
          .object({
            text: z.string().min(1),
          })
          .or(z.object({ image: z.string().min(1) }))
      )
      .min(1),
    answers: z.array(z.any()).min(1),
  })
  .refine((data) => (data.subject !== "math" ? data.passage : true), {
    message: "Passage is required",
    path: ["passage"],
  });
