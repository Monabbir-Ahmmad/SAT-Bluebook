import { Difficulties, SectionTypes } from "@/constants/enums";

import { questionSetSize } from "@/constants/data";
import { z } from "zod";

export const questionSetCreateValidationSchema = z
  .object({
    title: z.string().min(1),
    section: z.nativeEnum(SectionTypes),
    difficulty: z.nativeEnum(Difficulties),
    questions: z.array(z.string()).min(1),
  })
  .refine((data) => data.questions.length === questionSetSize[data.section], {
    message:
      "Number of questions must be 44 for math and 27 for reading and writing",
    path: ["questions"],
  });
