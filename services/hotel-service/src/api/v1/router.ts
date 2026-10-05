import { Router } from "express";
import hotelRouter from "../../modules/hotel/routes/hotel.route.js";

const v1Router: Router = Router();

v1Router.use("/hotels", hotelRouter);

export default v1Router;
