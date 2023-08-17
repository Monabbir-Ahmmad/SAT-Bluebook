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
    passage: z.string(),
    questionImage: z.string().optional(),
    subject: z.enum(["math", "reading", "writing"]),
    difficulty: z.number().min(0).max(2),
    tags: z.array(z.string()).min(1),
    optionType: z.enum(["mcq-text", "mcq-image", "grid-in"]),
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
  .refine((data) => data.subject !== "math" && data.passage, {
    message: "Passage is required for math questions",
  });
