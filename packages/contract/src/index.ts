import { initContract } from "@ts-rest/core";
import { z } from "zod"

const c = initContract();

const TestSchema = z.object({
  name: z.string(),
  age: z.number().positive(),
});

export const contract = c.router({
  getTest: {
    method: "GET",
    path: "/test",
    responses: {
      201: TestSchema,
    },
    summary: "Get test",
    strictStatusCodes: true,
  }
})