import { TsRestRequest, TsRestRequestHandler } from '@ts-rest/express';
import contract from 'contract';
import { NextFunction, Response as ExpressResponse } from 'express';
import { verifyRequestOrigin } from 'lucia';
import { lucia } from '../config/auth.js';
import { env } from '../config/env.js';

export const validateRequestMiddleware: TsRestRequestHandler<any> = async (
  req: TsRestRequest<any, typeof contract.auth.emailLogin>,
  res: ExpressResponse,
  next: NextFunction
) => {
  const originHeader = req.headers['Origin'] as string;
  // NOTE: May need to use `X-Forwarded-Host` instead
  const hostHeader = req.headers['Host'] as string;

  if (env.NODE_ENV === 'development') {
    if (!originHeader || !hostHeader) {
      console.warn('Missing Origin or Host header in development mode');
      // Allow request to proceed even if headers are missing
    }
  } else {
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden: Invalid or missing Origin/Host headers',
      });
    }
  }

  const cookieHeader = req.headers['cookie'] as string;
  const sessionId = lucia.readSessionCookie(cookieHeader ?? '');

  if (!sessionId) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const { session } = await lucia.validateSession(sessionId);
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie().serialize();
    res.appendHeader('Set-Cookie', sessionCookie);
  }

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id).serialize();
    res.appendHeader('Set-Cookie', sessionCookie);
  }

  res.locals.session = session;

  next();
};
