import { inject, injectable } from 'tsyringe';
import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import IProductPricesRepository from '../repositories/IProductPricesRepository';

@injectable()
class ListProductPricesByProductService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute(productId: string): Promise<ProductPrice[]> {
    const productPrices = await this.productPricesRepository.findByProductId(productId);
    return productPrices;
  }
}

export default ListProductPricesByProductService;
