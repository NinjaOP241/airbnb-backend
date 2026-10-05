import type { Prisma, Hotel } from "../../../../generated/prisma/client.js";
import type { IBaseRepository } from "../../../shared/database/repositories/base.repository.interface.js";

export interface IHotelRepository extends IBaseRepository<
  Hotel,
  Prisma.HotelCreateInput,
  Prisma.HotelUpdateInput
> {
  softDelete(id: number): Promise<boolean>;
}
