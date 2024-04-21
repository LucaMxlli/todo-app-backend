import { z } from 'zod';

export const SPLTokenValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  symbol: z.string().min(1, 'Symbol is required'),
  totalSupply: z
    .string()
    .min(1, 'Total Supply is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) >= 100000;
      },
      {
        message: 'Total Supply must be a number and greater than or equal 100000',
      }
    ),
  decimals: z
    .string()
    .min(1, 'Decimals is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) >= 0;
      },
      {
        message: 'Decimals must be a number and greater than or equal to 0',
      }
    )
    .refine(
      (val) => {
        return Number(val) <= 18;
      },
      {
        message: 'Decimals must be less than or equal to 18',
      }
    ),
});

export const PlatformTokenValidation = z.object({
  description: z.string().min(1, 'Description is required'),
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

export const PoolValidation = z.object({
  opens: z.date().refine((date) => date > new Date(), {
    message: 'Opens must be in the future',
  }),
  closes: z.date().refine((date) => date > new Date(), {
    message: 'Closes must be in the future',
  }),
  totalRaise: z
    .string()
    .min(1, 'Total Raise is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) > 0;
      },
      {
        message: 'Total Raise must be a number and greater than 0',
      }
    ),
  minAllocation: z
    .string()
    .min(1, 'Minimum Allocation is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) > 0;
      },
      {
        message: 'Minimum Allocation must be a number and greater than 0',
      }
    ),
  maxAllocation: z
    .string()
    .min(1, 'Maximum Allocation is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) > 0;
      },
      {
        message: 'Maximum Allocation must be a number and greater than 0',
      }
    ),
  opensHold: z
    .string()
    .min(1, 'Opens Hold is required')
    .refine(
      (val) => {
        return isNaN(Number(val)) === false && Number(val) >= 2;
      },
      {
        message: 'Pre sale must be hold at least 2 hours',
      }
    ),
});
