import * as z from 'zod';

// - min 8 chars
// - at least one lowercase, one uppercase, one digit, one special char
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
const USERNAME_REGEX = /^[a-z][a-z0-9]*(?:[._][a-z0-9]+)*$/;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 32;
const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 30;

const MAX_EMAIL_LENGTH = 254;
export const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export const nameSchema = z
  .string()
  .trim()
  .min(MIN_NAME_LENGTH, `Name must be at least ${MIN_NAME_LENGTH} characters`)
  .max(MAX_NAME_LENGTH, `Name must be ${MAX_NAME_LENGTH} characters or fewer`);

const usernameSchema = z
  .string()
  .trim()
  .min(
    MIN_USERNAME_LENGTH,
    `Username must be at least ${MIN_USERNAME_LENGTH} characters`,
  )
  .max(
    MAX_USERNAME_LENGTH,
    `Username must be ${MAX_USERNAME_LENGTH} characters or fewer`,
  )
  .regex(
    USERNAME_REGEX,
    'Username may contain lowercase letters, numbers, dots, or underscores',
  )
  .transform((val) => val.toLowerCase());

export const emailSchema = z
  .email({ error: 'Invalid email address' })
  .trim()
  .max(MAX_EMAIL_LENGTH, 'Email is too long')
  .transform((s) => s.toLowerCase());

export const loginIdentifierSchema = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase())
  .superRefine((value, ctx) => {
    const isEmail = emailSchema.safeParse(value).success;
    const isUsername = usernameSchema.safeParse(value).success;

    if (!isEmail && !isUsername) {
      ctx.addIssue({
        code: 'custom',
        message: 'Enter a valid email or username',
      });
    }
  });

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
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  loginIdentifier: loginIdentifierSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
