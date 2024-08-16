import { AppRouteMutation } from "@ts-rest/core";
import {
  SignUpSchema,
  SessionSchema,
  InvalidInputSchema,
  EmailInUseSchema,
} from "../../schemas/auth/index.js";

export const emailSignUp: AppRouteMutation = {
  method: "POST",
  path: "/email-sign-up",
  body: SignUpSchema,
  responses: {
    201: SessionSchema,
    400: InvalidInputSchema,
    409: EmailInUseSchema,
  },
  summary: "Sign up with email and password",
  strictStatusCodes: true,
};
