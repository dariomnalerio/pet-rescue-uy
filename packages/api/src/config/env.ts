import { z } from "zod"
import dotenv from "dotenv"
dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string({ message: "DATABASE_URL is required" }),
  AUTH_GITHUB_ID: z.string({ message: "AUTH_GITHUB_ID is required" }),
  AUTH_GITHUB_SECRET: z.string({ message: "AUTH_GITHUB_SECRET is required" }),
  NODE_ENV: z.string().refine((val) => val === "production" || val === "development", {
    message: "NODE_ENV must be 'production' or 'development'",
  }),
})

export const env = envSchema.parse(process.env)
