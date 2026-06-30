import { z } from "zod";

export const registerSchema =
  z.object({

    fullName:
      z.string(),

    email:
      z.string().email(),

    password:
      z.string(),

    // ================= ROLE =================

    role: z.enum([
      "user",
      "admin",
    ]).optional(),
  });