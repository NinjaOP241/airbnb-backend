import { Prisma } from "../../../../generated/prisma/client.js";
import type { Hotel } from "../../../../generated/prisma/client.js";
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

  async findById(id: number): Promise<Hotel | null> {
    return prisma.hotel.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAll(): Promise<Hotel[]> {
    return prisma.hotel.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.HotelUpdateInput,
  ): Promise<Hotel | null> {
    try {
      return await prisma.hotel.update({
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
        return null;
      }

      throw error;
    }
  }

  async softDelete(id: number): Promise<boolean> {
    try {
      await prisma.hotel.update({
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
        return false;
      }

      throw error;
    }
  }
}
