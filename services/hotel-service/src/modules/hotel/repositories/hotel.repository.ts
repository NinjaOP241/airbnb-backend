import type { Hotel, Prisma } from "../../../../generated/prisma/client.js";
import { prisma } from "../../../shared/database/prisma.js";
import { BaseRepository } from "../../../shared/database/repositories/base.repository.js";
import type { IHotelRepository } from "./hotel.repository.interface.js";

export class HotelRepository
  extends BaseRepository<
    Hotel,
    Prisma.HotelCreateInput,
    Prisma.HotelUpdateInput
  >
  implements IHotelRepository
{
  constructor() {
    super(prisma.hotel);
  }
}
