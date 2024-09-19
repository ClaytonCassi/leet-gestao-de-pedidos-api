import { inject, injectable } from 'tsyringe';
import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import IProductPricesRepository from '../repositories/IProductPricesRepository';

@injectable()
class ListProductPricesService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute(): Promise<ProductPrice[]> {
    const productPrices = await this.productPricesRepository.findAll();
    return productPrices;
  }
}

export default ListProductPricesService;
