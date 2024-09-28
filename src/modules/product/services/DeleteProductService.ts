// src/modules/product/services/DeleteProductService.ts

import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../../modules/product/repositories/IProductRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    await this.productRepository.delete(id);
  }
}

export default DeleteProductService;
