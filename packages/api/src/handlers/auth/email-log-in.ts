import { emailLogIn as emailLoginService } from '../../services/auth/email-log-in.js';
import { AppRouteImplementation } from '@ts-rest/express';
import contract from 'contract';
import { lucia } from '../../config/auth.js';

export const emailLogin: AppRouteImplementation<typeof contract.auth.emailLogin> = async (req) => {
  const { email, password } = req.body;
  const session = await emailLoginService({ email, password });

  const sessionString = lucia.createSessionCookie(session.id).serialize();

  req.res.setHeader('Set-Cookie', sessionString);

  return {
    status: 201,
    body: {
      session,
    },
  };
};
