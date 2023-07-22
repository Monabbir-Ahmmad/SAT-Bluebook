import { z } from "zod";

export const questionFormValidator = z.object({
  question: z.string().min(1),
  questionImage: z.string().optional(),
  subject: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()).min(1),
  optionType: z.enum(["text", "image"]),
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
});
