import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      repeatPassword: z.string().min(1, "Repeat password is required"),
      role: z.enum(["user", "admin"]).optional(),
      age: z.number().int().positive("Age must be a positive number"),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    role: z.enum(["user", "admin"]).optional(),
    age: z.number().int().positive("Age must be a positive number").optional(),
  }),
  params: z.object({
    id: z.string().length(24, "Invalid user ID"),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid user ID"),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid user ID"),
  }),
});
