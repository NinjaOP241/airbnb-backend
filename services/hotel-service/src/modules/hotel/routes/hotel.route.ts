import { Router } from "express";
import { HotelController } from "../controllers/hotel.controller.js";
import { HotelRepository } from "../repositories/hotel.repository.js";
import { HotelService } from "../services/hotel.service.js";
import {
  createHotelSchema,
  updateHotelSchema,
} from "../schemas/hotel.schema.js";
import {
  validateRequestBody,
  validateRouteParams,
} from "../../../shared/middlewares/validate.js";
import { idParamSchema } from "../../../shared/schemas/common.schema.js";

const hotelRepository = new HotelRepository();
const hotelService = new HotelService(hotelRepository);
const hotelController = new HotelController(hotelService);

const hotelRouter: Router = Router();

hotelRouter.get("/", hotelController.getAllHotels);

hotelRouter.get(
  "/:id",
  validateRouteParams(idParamSchema),
  hotelController.getHotelById,
);

hotelRouter.post(
  "/",
  validateRequestBody(createHotelSchema),
  hotelController.createHotel,
);

hotelRouter.patch(
  "/:id",
  validateRouteParams(idParamSchema),
  validateRequestBody(updateHotelSchema),
  hotelController.updateHotel,
);

hotelRouter.delete(
  "/:id",
  validateRouteParams(idParamSchema),
  hotelController.deleteHotel,
);

export default hotelRouter;
