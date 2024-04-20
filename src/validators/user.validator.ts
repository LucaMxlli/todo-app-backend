import { z } from "zod";

export const createUserInputValidator = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  walletAddress: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserInputValidator>;

export const loginUserInputValidator = z.object({
  walletAddress: z.string(),
});

export type LoginUserInput = z.infer<typeof loginUserInputValidator>;

export const updateUserValidator = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
});

export type UpdateUser = z.infer<typeof updateUserValidator>;
