import { z } from 'zod';

export const createCoinInputValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Please enter a name.',
    })
    .max(20, {
      message: 'Please enter a name.',
    }),
  symbolName: z
    .string()
    .min(3, {
      message: 'Please enter a symbol name.',
    })
    .max(10, {
      message: 'Please enter a symbol name.',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Please enter your bio.',
    })
    .max(300, {
      message: 'Please enter your bio.',
    }),
  bannerImage: z.string().optional(),
  symbolImage: z.string().optional(),
  twitter: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://twitter.com'), { message: 'Invalid Twitter link' })
    .optional(),
  reddit: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://www.reddit.com'), { message: 'Invalid Reddit link' })
    .optional(),
  discord: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://discord.gg'), {
      message: 'Invalid Discord link',
    })
    .optional(),
  telegram: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://t.me'), {
      message: 'Invalid Telegram link',
    })
    .optional(),
  website: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://'), {
      message: 'Invalid Website link',
    })
    .optional(),
  docs: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://docs.google.com/document'), {
      message: 'Invalid Google Docs link',
    })
    .optional(),
});

export type CreateCoinInput = z.infer<typeof createCoinInputValidator>;

export const updateCoinInputValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Please enter a name.',
    })
    .max(20, {
      message: 'Please enter a name.',
    }),
  symbolName: z
    .string()
    .min(3, {
      message: 'Please enter a symbol name.',
    })
    .max(10, {
      message: 'Please enter a symbol name.',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Please enter your bio.',
    })
    .max(300, {
      message: 'Please enter your bio.',
    }),
});

export type UpdateCoinInput = z.infer<typeof updateCoinInputValidator>;

export const SocialValidation = z.object({
  twitter: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://twitter.com'), { message: 'Invalid Twitter link' })
    .optional(),
  reddit: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://www.reddit.com'), { message: 'Invalid Reddit link' })
    .optional(),
  discord: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://discord.gg'), {
      message: 'Invalid Discord link',
    })
    .optional(),
  telegram: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://t.me'), {
      message: 'Invalid Telegram link',
    })
    .optional(),
  website: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://'), {
      message: 'Invalid Website link',
    })
    .optional(),
  docs: z
    .string()
    .refine((value) => value === '' || value.startsWith('https://docs.google.com/document'), {
      message: 'Invalid Google Docs link',
    })
    .optional(),
});

export type SocialInput = z.infer<typeof SocialValidation>;

export const createInvestmentValidation = z.object({
  id: z.string().refine((value) => !isNaN(Number(value))),
  signature: z.string(),
});

export type CreateInvestmentValidation = z.infer<typeof createInvestmentValidation>;

export const checkInvestmentValidation = z.object({
  id: z.string().refine((value) => !isNaN(Number(value))),
  amount: z.number(),
});

export type CheckInvestmentValidation = z.infer<typeof checkInvestmentValidation>;
