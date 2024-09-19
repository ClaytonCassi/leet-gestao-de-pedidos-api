import { inject, injectable } from 'tsyringe';
import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import IProductPricesRepository from '../repositories/IProductPricesRepository';
import ICreateProductPriceDTO from '../dtos/ICreateProductPriceDTO';

@injectable()
class CreateProductPriceService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute({
    product_id,
    faixa,
    quantidade_min,
    quantidade_max,
    preco,
    height,
    width,
    depth,
    weight,
    volume,
    stackable,
    stackingFactor,
    pairing_height = 0,
    pairing_width = 0,
    pairing_depth = 0,
  }: ICreateProductPriceDTO): Promise<ProductPrice> {
    const productPrice = await this.productPricesRepository.create({
      product_id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
      height,
      width,
      depth,
      weight,
      volume,
      stackable,
      stackingFactor,
      pairing_height,
      pairing_width,
      pairing_depth,
    });

    return productPrice;
  }
}

export default CreateProductPriceService;
