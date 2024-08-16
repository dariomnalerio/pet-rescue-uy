import { initContract } from "@ts-rest/core";
import { emailSignUp } from "./email-sign-up.js";
import { emailLogin } from "./email-login.js";
import { logout } from "./log-out.js";
const c = initContract();

export const authContract = c.router(
  {
    emailSignUp,
    emailLogin,
    logout,
  },
  {
    pathPrefix: "/auth",
  }
);
