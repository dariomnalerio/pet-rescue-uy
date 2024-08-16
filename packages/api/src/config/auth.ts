import { Lucia } from 'lucia';
import { env } from './env.js';
import { prisma } from './prisma.js';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient, Prisma } from '@prisma/client';

export const adapter: PrismaAdapter<PrismaClient> = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to true when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: Prisma.UserSelect) => {
    return {
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
  }
}
