import { Prisma } from "../../../../generated/prisma/client.js";
import type { IBaseRepository } from "./base.repository.interface.js";

type BaseModelDelegate<TEntity, TCreateInput, TUpdateInput> = {
  findUnique(args: { where: { id: number } }): Promise<TEntity | null>;
  findMany(): Promise<TEntity[]>;
  create(args: { data: TCreateInput }): Promise<TEntity>;
  update(args: { where: { id: number }; data: TUpdateInput }): Promise<TEntity>;
  delete(args: { where: { id: number } }): Promise<TEntity>;
};

export abstract class BaseRepository<
  TEntity,
  TCreateInput,
  TUpdateInput,
> implements IBaseRepository<TEntity, TCreateInput, TUpdateInput> {
  protected constructor(
    protected readonly model: BaseModelDelegate<
      TEntity,
      TCreateInput,
      TUpdateInput
    >,
  ) {}

  async findById(id: number): Promise<TEntity | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<TEntity[]> {
    return this.model.findMany();
  }

  async create(data: TCreateInput): Promise<TEntity> {
    return this.model.create({ data });
  }

  async update(id: number, data: TUpdateInput): Promise<TEntity | null> {
    try {
      return await this.model.update({
        where: { id },
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

  async delete(id: number): Promise<boolean> {
    try {
      await this.model.delete({
        where: { id },
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
