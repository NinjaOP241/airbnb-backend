import type { Hotel } from "../../../../generated/prisma/client.js";
import type { HotelResponseDTO } from "../dtos/hotel.dto.js";

export class HotelMapper {
  static toResponse(hotel: Hotel): HotelResponseDTO {
    return {
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      location: hotel.location,
      rating: hotel.rating,
      ratingCount: hotel.ratingCount,
    };
  }
}
