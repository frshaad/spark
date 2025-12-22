import { emailSchema } from './schema';

export function sanitizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ');
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function identifyLoginType(input: string) {
  const value = input.trim().toLowerCase();

  if (emailSchema.safeParse(value).success) {
    return { type: 'email' as const, value };
  }

  return { type: 'username' as const, value };
}
