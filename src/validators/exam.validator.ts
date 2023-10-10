import { Difficulties, SectionTypes } from "@/constants/enums";

import { z } from "zod";

const examCreateQuestionSetWithTimeValidationSchema = z.object({
  questionSet: z.string().min(1),
  timeLimit: z.number().optional(),
  breakTime: z.number().optional(),
});

const examCreateFullQuestionSetValidationSchema = z.object({
  [Difficulties.EASY]: examCreateQuestionSetWithTimeValidationSchema,
  [Difficulties.BASE]: examCreateQuestionSetWithTimeValidationSchema,
  [Difficulties.HARD]: examCreateQuestionSetWithTimeValidationSchema,
});

export const examCreateValidationSchema = z.object({
  title: z.string().min(1),
  [SectionTypes.MATH]: examCreateFullQuestionSetValidationSchema,
  [SectionTypes.READING_WRITING]: examCreateFullQuestionSetValidationSchema,
});
