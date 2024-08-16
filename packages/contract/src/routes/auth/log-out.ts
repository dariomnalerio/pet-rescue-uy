import { AppRouteMutation } from "@ts-rest/core";
import { z } from "zod";

export const logout: AppRouteMutation = {
  method: "POST",
  path: "/logout",
  body: z.object({}),
  responses: {
    204: z.void(),
    401: z.void(),
  },
  summary: "Logout the user and invalidate the session",
  strictStatusCodes: true,
};
