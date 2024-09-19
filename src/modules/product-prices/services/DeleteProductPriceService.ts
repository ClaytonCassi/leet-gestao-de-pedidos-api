import { inject, injectable } from 'tsyringe';
import IProductPricesRepository from '../repositories/IProductPricesRepository';

@injectable()
class DeleteProductPriceService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.productPricesRepository.delete(id);
  }
}

export default DeleteProductPriceService;
