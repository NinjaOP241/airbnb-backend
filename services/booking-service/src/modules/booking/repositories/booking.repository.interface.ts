import type { Booking, Prisma } from "../../../../generated/prisma/client.js";
import type { IBaseRepository } from "../../../shared/database/repositories/base.repository.interface.js";

export interface IBookingRepository extends IBaseRepository<
  Booking,
  Prisma.BookingCreateInput,
  Prisma.BookingUpdateInput
> {
  softDelete(id: number): Promise<boolean>;
}
