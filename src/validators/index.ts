import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string(),
});

export type SignupInput = z.infer<typeof signupSchema>;
