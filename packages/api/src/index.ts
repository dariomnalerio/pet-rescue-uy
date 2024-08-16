import { createExpressEndpoints, initServer } from '@ts-rest/express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contract from 'contract';
import { swaggerMiddleware, swaggerSetup } from './config/swagger.js';
import { emailLogin } from './handlers/auth/email-log-in.js';
import { emailSignUp } from './handlers/auth/email-sign-up.js';
import { logout } from './handlers/auth/log-out.js';
import { validateRequestMiddleware } from './middleware/auth.js';
const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  auth: {
    emailSignUp,
    emailLogin,
    logout: {
      handler: logout,
      middleware: [validateRequestMiddleware],
    },
  },
});

createExpressEndpoints(contract, router, app);

app.use('/api-docs', swaggerMiddleware, swaggerSetup);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
