// src/modules/product/services/ListProductsService.ts

import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../../modules/product/repositories/IProductRepository';
import Product from '../../../modules/product/infra/typeorm/entities/Product';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}

export default ListProductsService;
