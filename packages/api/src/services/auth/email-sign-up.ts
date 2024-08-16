import { Prisma } from '@prisma/client';
import { Session } from 'lucia';
import { lucia } from '../../config/auth.js';
import { prisma } from '../../config/prisma.js';
import { CustomError } from '../../utils/error.js';
import { saltAndHashPassword } from '../../utils/password.js';

export async function emailSignUp(data: Prisma.UserCreateInput): Promise<Session> {
  const { email, password } = data;

  const hashedPassword = await saltAndHashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const session = await lucia.createSession(user.id, {});

    return session;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new CustomError('Email already in use', 409);
      }
    }

    if (error instanceof CustomError) {
      throw error;
    }
  }

  throw new CustomError('Internal Server Error', 500);
}
