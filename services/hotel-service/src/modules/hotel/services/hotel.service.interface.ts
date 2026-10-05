import type { HotelResponseDTO } from "../dtos/hotel.dto.js";
import type {
  CreateHotelDTO,
  UpdateHotelDTO,
} from "../schemas/hotel.schema.js";

export interface IHotelService {
  getHotelById(id: number): Promise<HotelResponseDTO>;

  getAllHotels(): Promise<HotelResponseDTO[]>;

  createHotel(data: CreateHotelDTO): Promise<HotelResponseDTO>;

  updateHotel(id: number, data: UpdateHotelDTO): Promise<HotelResponseDTO>;

  deleteHotel(id: number): Promise<void>;
}
