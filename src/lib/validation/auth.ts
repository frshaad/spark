import * as z from 'zod';
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  usernameSchema,
} from './base';

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

export const usernameFormSchema = z.object({
  username: usernameSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
