import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('"Invalid email format"'),
    password: z.string().min(6, "Password must be at least 6 character"),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({ message: "refresh token is required" })
      .jwt({ message: "Invalid JWT format" }),
  }),
});
