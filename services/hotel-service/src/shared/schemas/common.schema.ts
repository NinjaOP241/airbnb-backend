import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce
    .number("Hotel ID must be a number")
    .int("Hotel ID must be an integer")
    .positive("Hotel ID must be greater than zero"),
});
