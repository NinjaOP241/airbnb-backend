export interface IBaseRepository<TEntity, TCreateInput, TUpdateInput> {
  findById(id: number): Promise<TEntity | null>;

  findAll(): Promise<TEntity[]>;

  create(data: TCreateInput): Promise<TEntity>;

  update(id: number, data: TUpdateInput): Promise<TEntity | null>;

  delete(id: number): Promise<boolean>;
}
