// src/modules/product/repositories/IProductRepository.ts

import Product from '../../../modules/product/infra/typeorm/entities/Product';
import ICreateProductDTO from '../../../modules/product/dtos/ICreateProductDTO';

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  update(id: string, data: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
}

export default IProductRepository;
