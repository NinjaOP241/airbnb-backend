import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller.js";
import { HotelRepository } from "../repositories/hotel.repository.js";
import { HotelService } from "../services/hotel.service.js";
import {
  createHotelSchema,
  updateHotelSchema,
} from "../schemas/hotel.schema.js";
import { validateRequestBody } from "../../../shared/middlewares/validate.js";

const hotelRepository = new HotelRepository();
const hotelService = new HotelService(hotelRepository);
const hotelController = new HotelController(hotelService);

const hotelRouter: Router = Router();

hotelRouter.get("/", hotelController.getAllHotels);

hotelRouter.get("/:id", hotelController.getHotelById);

hotelRouter.post(
  "/",
  validateRequestBody(createHotelSchema),
  hotelController.createHotel,
);

hotelRouter.patch(
  "/:id",
  validateRequestBody(updateHotelSchema),
  hotelController.updateHotel,
);

hotelRouter.delete("/:id", hotelController.deleteHotel);

export default hotelRouter;
