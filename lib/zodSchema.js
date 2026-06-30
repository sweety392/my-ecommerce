// src/schemas/user.schema.js

import { z } from "zod";

/* ======================================================
   COMMON FIELDS
====================================================== */

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .trim()
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password cannot exceed 20 characters");

export const roleSchema = z.enum(["user", "admin"]);

/* ======================================================
   REGISTER SCHEMA
====================================================== */

export const registerSchema = z.object({
  role: roleSchema.default("user"),

  email: emailSchema,

  password: passwordSchema,

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .optional(),

  address: z.string().trim().optional(),

  avatar: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
});

/* ======================================================
   LOGIN SCHEMA
====================================================== */

export const loginSchema = z.object({
  email: emailSchema,

  password: passwordSchema,
});

/* ======================================================
   UPDATE PROFILE SCHEMA
====================================================== */

export const updateProfileSchema = z.object({
  phone: z.string().optional(),

  address: z.string().optional(),

  avatar: z
    .object({
      url: z.string().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
});

/* ======================================================
   CHANGE PASSWORD SCHEMA
====================================================== */

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,

    newPassword: passwordSchema,
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Old password and new password cannot be same",
    path: ["newPassword"],
  });