import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";

import { z } from "zod";

export const questionCreateValidationSchema = z
  .object({
    question: z.string().min(1),
    passage: z.string().optional(),
    questionImage: z.string().optional(),
    section: z.nativeEnum(SectionTypes),
    difficulty: z.nativeEnum(Difficulties),
    tags: z.array(z.string()).optional(),
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
    answers: z.array(z.number()).min(1),
  })
  .refine(
    (data) => (data.section !== SectionTypes.MATH ? data.passage : true),
    {
      message: "Passage is required",
      path: ["passage"],
    }
  );
