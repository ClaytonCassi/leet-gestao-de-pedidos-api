import { inject, injectable } from 'tsyringe';
import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import IProductPricesRepository from '../repositories/IProductPricesRepository';

@injectable()
class ShowProductPriceService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute(id: string): Promise<ProductPrice | undefined> {
    const productPrice = await this.productPricesRepository.findById(id);
    return productPrice;
  }
}

export default ShowProductPriceService;
