import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { haveIBeenPwned, lastLoginMethod, username } from 'better-auth/plugins';
import { hashPassword as hash, verifyPassword as verify } from './argon2';
import prisma from './prisma';
import { MIN_PASSWORD_LENGTH } from './validation/schema';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    password: { hash, verify },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    username(),
    lastLoginMethod(),
    haveIBeenPwned({
      customPasswordCompromisedMessage: 'Please choose a more secure password.',
    }),
    nextCookies(),
  ],
});

export type Provider = keyof typeof auth.options.socialProviders;
