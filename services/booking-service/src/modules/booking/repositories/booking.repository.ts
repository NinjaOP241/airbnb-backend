import { Prisma } from "../../../../generated/prisma/client.js";
import type { Booking } from "../../../../generated/prisma/client.js";
import { prisma } from "../../../shared/database/prisma.js";
import { BaseRepository } from "../../../shared/database/repositories/base.repository.js";
import type { IBookingRepository } from "./booking.repository.interface.js";

export class BookingRepository
  extends BaseRepository<
    Booking,
    Prisma.BookingCreateInput,
    Prisma.BookingUpdateInput
  >
  implements IBookingRepository
{
  constructor() {
    super(prisma.booking);
  }

  async findById(id: number): Promise<Booking | null> {
    return prisma.booking.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAll(): Promise<Booking[]> {
    return prisma.booking.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.BookingUpdateInput,
  ): Promise<Booking | null> {
    try {
      return await prisma.booking.update({
        where: {
          id,
          deletedAt: null,
        },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null; // Returns null if the record to update does not exist
      }
      throw error; // Rethrow other errors
    }
  }

  async softDelete(id: number): Promise<boolean> {
    try {
      await prisma.booking.update({
        where: {
          id,
          deletedAt: null,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return false; // Returns false if the record to soft delete does not exist
      }
      throw error; // Rethrow other errors
    }
  }
}
