import * as z from 'zod'

export const baseSchemaConfig = {
  // Display Name
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 32,

  // Username
  USERNAME_PATTERN: '[a-z][a-z0-9]*(?:[._][a-z0-9]+)*',
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 30,

  // Password
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,

  // Email
  MAX_EMAIL_LENGTH: 254,
}

const USERNAME_REGEX = new RegExp(`^${baseSchemaConfig.USERNAME_PATTERN}$`)

export const nameSchema = z
  .string()
  .trim()
  .min(
    baseSchemaConfig.MIN_NAME_LENGTH,
    `Name must be at least ${baseSchemaConfig.MIN_NAME_LENGTH} characters`,
  )
  .max(
    baseSchemaConfig.MAX_NAME_LENGTH,
    `Name must be ${baseSchemaConfig.MAX_NAME_LENGTH} characters or fewer`,
  )

export const usernameSchema = z
  .string()
  .trim()
  .min(
    baseSchemaConfig.MIN_USERNAME_LENGTH,
    `Username must be at least ${baseSchemaConfig.MIN_USERNAME_LENGTH} characters`,
  )
  .max(
    baseSchemaConfig.MAX_USERNAME_LENGTH,
    `Username must be ${baseSchemaConfig.MAX_USERNAME_LENGTH} characters or fewer`,
  )
  .regex(USERNAME_REGEX, 'Username may contain lowercase letters, numbers, dots, or underscores')
  .transform((val) => val.toLowerCase())

export const emailSchema = z
  .email({ error: 'Invalid email address' })
  .trim()
  .max(baseSchemaConfig.MAX_EMAIL_LENGTH, 'Email is too long')
  .transform((s) => s.toLowerCase())

export const passwordSchema = z
  .string()
  .min(
    baseSchemaConfig.MIN_PASSWORD_LENGTH,
    `Password must be at least ${baseSchemaConfig.MIN_PASSWORD_LENGTH} characters`,
  )
  .max(
    baseSchemaConfig.MAX_PASSWORD_LENGTH,
    `Password must be ${baseSchemaConfig.MAX_PASSWORD_LENGTH} characters or fewer`,
  )
  .regex(
    baseSchemaConfig.PASSWORD_PATTERN,
    'Password must include an uppercase letter, a lowercase letter, a number, and a symbol',
  )
