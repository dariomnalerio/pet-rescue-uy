import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Session } from 'lucia';
import { lucia } from '../../config/auth.js';
import { prisma } from '../../config/prisma.js';
import { CustomError } from '../../utils/error.js';
import { verifyPassword } from '../../utils/password.js';

export async function emailLogIn({ email, password }: Prisma.UserCreateInput): Promise<Session> {
  try {
    const existingUser = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    const validPassword = await verifyPassword({ password, hashedPassword: existingUser.password });

    if (!validPassword) {
      throw new CustomError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const session = await lucia.createSession(existingUser.id, {});

    return session;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      }
    }
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Internal server error', 500, 'INTERNAL_SERVER_ERROR');
  }
}
