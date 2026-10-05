import { notFound } from "../../../shared/errors/app-error.js";
import type { HotelResponseDTO } from "../dtos/hotel.dto.js";
import { HotelMapper } from "../mappers/hotel.mapper.js";
import type {
  CreateHotelDTO,
  UpdateHotelDTO,
} from "../schemas/hotel.schema.js";
import type { IHotelRepository } from "../repositories/hotel.repository.interface.js";
import type { IHotelService } from "./hotel.service.interface.js";

export class HotelService implements IHotelService {
  constructor(private readonly hotelRepository: IHotelRepository) {}

  async getHotelById(id: number): Promise<HotelResponseDTO> {
    const hotel = await this.hotelRepository.findById(id);

    if (!hotel) {
      throw notFound(`Hotel with id ${id} not found`);
    }

    return HotelMapper.toResponse(hotel);
  }

  async getAllHotels(): Promise<HotelResponseDTO[]> {
    const hotels = await this.hotelRepository.findAll();

    return hotels.map(HotelMapper.toResponse);
  }

  async createHotel(data: CreateHotelDTO): Promise<HotelResponseDTO> {
    const hotel = await this.hotelRepository.create(data);
    return HotelMapper.toResponse(hotel);
  }

  async updateHotel(
    id: number,
    data: UpdateHotelDTO,
  ): Promise<HotelResponseDTO> {
    const updatedHotel = await this.hotelRepository.update(id, data);

    if (!updatedHotel) {
      throw notFound(`Hotel with id ${id} not found`);
    }

    return HotelMapper.toResponse(updatedHotel);
  }

  async deleteHotel(id: number): Promise<void> {
    const deleted = await this.hotelRepository.softDelete(id);

    if (!deleted) {
      throw notFound(`Hotel with id ${id} not found`);
    }
  }
}
