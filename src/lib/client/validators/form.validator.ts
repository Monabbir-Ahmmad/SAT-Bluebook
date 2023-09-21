import { Difficulties, OptionTypes, SectionTypes } from "@/constants/enums";

import { questionSetSize } from "@/constants/data";
import { z } from "zod";

export const signupFormValidator = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginFormValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Invalid password" }),
});

export const questionFormValidator = z
  .object({
    question: z.string().min(1),
    passage: z.string().optional(),
    questionImage: z.string().optional(),
    section: z.nativeEnum(SectionTypes),
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
    answers: z.array(z.number()).min(1),
  })
  .refine(
    (data) => (data.section !== SectionTypes.MATH ? data.passage : true),
    {
      message: "Passage is required",
      path: ["passage"],
    }
  );

export const questionSetFormValidator = z
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

export const examCreateFormValidator = z.object({
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
