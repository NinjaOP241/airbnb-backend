import type { Booking } from "../../../../generated/prisma/client.js";
import { formatDateOnly } from "../../../shared/utils/date.utils.js";
import type { BookingResponseDTO } from "../dtos/booking.dto.js";

export class BookingMapper {
  static toResponse(booking: Booking): BookingResponseDTO {
    return {
      id: booking.id,
      userId: booking.userId,
      hotelId: booking.hotelId,
      checkIn: formatDateOnly(booking.checkIn),
      checkOut: formatDateOnly(booking.checkOut),
      bookingAmount: booking.bookingAmount.toFixed(2),
      totalGuests: booking.totalGuests,
      status: booking.status,
    };
  }
}
