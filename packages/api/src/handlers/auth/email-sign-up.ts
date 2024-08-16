import { emailSignUp as emailSignUpService } from '../../services/auth/email-sign-up.js';
import { AppRouteImplementation } from '@ts-rest/express';
import contract from 'contract';
import { lucia } from '../../config/auth.js';

export const emailSignUp: AppRouteImplementation<typeof contract.auth.emailSignUp> = async (req) => {
  const { email, password } = req.body;

  const session = await emailSignUpService({ email, password });

  const sessionString = lucia.createSessionCookie(session.id).serialize();

  req.res.setHeader('Set-Cookie', sessionString);

  return {
    status: 201,
    body: {
      session,
    },
  };
};
