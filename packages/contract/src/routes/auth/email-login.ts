import { AppRouteMutation } from "@ts-rest/core";
import {
  LoginSchema,
  SessionSchema,
  InvalidInputSchema,
  InvalidCredentialsSchema,
  UserNotFoundSchema,
} from "../../schemas/auth/index.js";

export const emailLogin: AppRouteMutation = {
  method: "POST",
  path: "/email-login",
  body: LoginSchema,
  responses: {
    200: SessionSchema,
    400: InvalidInputSchema,
    401: InvalidCredentialsSchema,
    404: UserNotFoundSchema,
  },
  summary: "Login with email and password",
  strictStatusCodes: true,
};
