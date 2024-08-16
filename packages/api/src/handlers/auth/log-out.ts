import { AppRouteImplementation } from '@ts-rest/express';
import contract from 'contract'; // Adjust according to your contract import
import { lucia } from '../../config/auth.js';

export const logout: AppRouteImplementation<typeof contract.auth.logout> = async (req) => {
  const session = req.res.locals.session;

  if (!session) {
    console.log('here');
    return {
      status: 401,
      body: {},
    };
  }

  await lucia.invalidateSession(session.id);

  req.res.setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize());

  return {
    status: 204,
    body: {},
  };
};
