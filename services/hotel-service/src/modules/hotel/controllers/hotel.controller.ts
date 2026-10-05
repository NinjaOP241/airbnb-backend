import type { Request, Response } from "express";
import { z } from "zod";
import type { IHotelService } from "../services/hotel.service.interface.js";
import { sendSuccess } from "../../../shared/utils/api-response.js";
import { idParamSchema } from "../../../shared/schemas/common.schema.js";

export class HotelController {
  constructor(private readonly hotelService: IHotelService) {
    this.getHotelById = this.getHotelById.bind(this);
    this.getAllHotels = this.getAllHotels.bind(this);
    this.createHotel = this.createHotel.bind(this);
    this.updateHotel = this.updateHotel.bind(this);
    this.deleteHotel = this.deleteHotel.bind(this);
  }

  async getHotelById(req: Request, res: Response): Promise<void> {
    const { id } = req.validatedParams as z.infer<typeof idParamSchema>;
    const hotel = await this.hotelService.getHotelById(id);
    sendSuccess(res, hotel);
  }

  async getAllHotels(_req: Request, res: Response): Promise<void> {
    const hotels = await this.hotelService.getAllHotels();
    sendSuccess(res, hotels);
  }

  async createHotel(req: Request, res: Response): Promise<void> {
    const data = req.body;
    const hotel = await this.hotelService.createHotel(data);
    sendSuccess(res, hotel, 201, "Hotel created successfully");
  }

  async updateHotel(req: Request, res: Response): Promise<void> {
    const { id } = req.validatedParams as z.infer<typeof idParamSchema>;
    const data = req.body;
    const hotel = await this.hotelService.updateHotel(id, data);
    sendSuccess(res, hotel, 200, "Hotel updated successfully");
  }

  async deleteHotel(req: Request, res: Response): Promise<void> {
    const { id } = req.validatedParams as z.infer<typeof idParamSchema>;
    await this.hotelService.deleteHotel(id);
    sendSuccess(res, null, 200, "Hotel deleted successfully");
  }
}
