import { initContract } from "@ts-rest/core";
import { authContract } from "./auth/index.js";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract,
  },
  {
    pathPrefix: "/api/v1",
  }
);
