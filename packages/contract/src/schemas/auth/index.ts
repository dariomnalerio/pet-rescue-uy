import { z } from "zod";

const EmailSchema = z.string({ message: "Email is required" }).email();
const PasswordSchema = z
  .string({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" });

export const SignUpSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string({ message: "Password is required" }),
});

export const SessionSchema = z.object({
  session: z.object({
    id: z.string(),
    expiresAt: z.date(),
    fresh: z.boolean(),
    userId: z.string(),
  }),
});

export const BaseErrorSchema = z.object({
  message: z.string(),
});

export const EmailInUseSchema = BaseErrorSchema.extend({
  message: z.string({ message: "Email is already in use" }),
});

export const InvalidInputSchema = BaseErrorSchema.extend({
  message: z.string({ message: "Invalid input" }),
});

export const InvalidCredentialsSchema = BaseErrorSchema.extend({
  message: z.string({ message: "Invalid credentials" }),
});

export const UserNotFoundSchema = BaseErrorSchema.extend({
  message: z.string({ message: "User not found" }),
});
