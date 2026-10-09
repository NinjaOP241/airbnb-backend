import { z } from "zod";

const bookingDateSchema = z.iso
  .date()
  .transform((value) => new Date(`${value}T00:00:00.000Z`));

export const createBookingSchema = z
  .object({
    hotelId: z.number().int().positive(),
    checkIn: bookingDateSchema,
    checkOut: bookingDateSchema,
    totalGuests: z.number().int().positive(),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: "checkOut date must be after checkIn date",
    path: ["checkOut"],
  });

export const updateBookingSchema = z
  .object({
    checkIn: bookingDateSchema.optional(),
    checkOut: bookingDateSchema.optional(),
    totalGuests: z.number().int().positive().optional(),
  })
  .superRefine((data, context) => {
    const hasCheckIn = data.checkIn !== undefined;
    const hasCheckOut = data.checkOut !== undefined;

    if (hasCheckIn !== hasCheckOut) {
      const path = hasCheckIn ? ["checkOut"] : ["checkIn"];

      context.addIssue({
        code: "custom",
        message: "checkIn and checkOut must be provided together",
        path,
      });
    }

    if (hasCheckIn && hasCheckOut && data.checkIn! >= data.checkOut!) {
      context.addIssue({
        code: "custom",
        message: "checkOut date must be after checkIn date",
        path: ["checkOut"],
      });
    }

    if (Object.keys(data).length === 0) {
      context.addIssue({
        code: "custom",
        message: "At least one field must be provided for update",
      });
    }
  });
