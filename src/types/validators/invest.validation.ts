import { z } from 'zod';

export const InvestValidation = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) > 0;
      },
      {
        message: 'Amount must be a number and greater than 0',
      }
    ),
});
