// src/modules/product/services/ShowProductService.ts

import { injectable, inject } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(id: string): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);
    return product;
  }
}

export default ShowProductService;
