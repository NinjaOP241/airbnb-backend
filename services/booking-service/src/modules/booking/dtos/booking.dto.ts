import { z } from "zod";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../schemas/booking.schema.js";
import type { BookingStatus } from "../../../../generated/prisma/enums.js";

export type BookingDTO = z.infer<typeof createBookingSchema>;
export type UpdateBookingDTO = z.infer<typeof updateBookingSchema>;

export type BookingResponseDTO = {
  id: number;
  userId: number;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  bookingAmount: string;
  totalGuests: number;
  status: BookingStatus;
};
