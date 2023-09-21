import { Difficulties, SectionTypes } from "@/constants/enums";

import { z } from "zod";

export const examCreateValidationSchema = z.object({
  title: z.string().min(1),
  [SectionTypes.MATH]: z.object({
    [Difficulties.EASY]: z.string().min(1),
    [Difficulties.BASE]: z.string().min(1),
    [Difficulties.HARD]: z.string().min(1),
  }),
  [SectionTypes.READING_WRITING]: z.object({
    [Difficulties.EASY]: z.string().min(1),
    [Difficulties.BASE]: z.string().min(1),
    [Difficulties.HARD]: z.string().min(1),
  }),
});
