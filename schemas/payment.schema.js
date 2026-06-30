// validations/payment.schema.js

import { z } from "zod";

export const paymentSchema =
  z.object({

    amount: z
      .number()
      .positive(),

  });