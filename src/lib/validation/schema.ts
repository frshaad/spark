import * as z from 'zod';

// - min 8 chars
// - at least one lowercase, one uppercase, one digit, one special char
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 32;
const MAX_EMAIL_LENGTH = 254;
export const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export const nameSchema = z
  .string()
  .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`)
  .max(MAX_NAME_LENGTH, `Name must be ${MAX_NAME_LENGTH} characters or fewer`)
  .trim();

export const emailSchema = z
  .email({ error: 'Invalid email address' })
  .trim()
  .max(MAX_EMAIL_LENGTH, 'Email is too long')
  .transform((s) => s.toLowerCase());

export const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  )
  .max(
    MAX_PASSWORD_LENGTH,
    `Password must be ${MAX_PASSWORD_LENGTH} characters or fewer`,
  )
  .regex(
    PASSWORD_REGEX,
    'Password must include an uppercase letter, a lowercase letter, a number, and a symbol',
  );

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
