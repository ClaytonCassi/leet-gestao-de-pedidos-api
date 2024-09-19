import { getRepository, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import IProductPricesRepository from '@modules/price-calculator/repositories/IProductPricesRepository';
import ProductPrice from '@modules/product-prices/infra/typeorm/entities/ProductPrice';


class ProductPricesRepository implements IProductPricesRepository {
  private ormRepository: Repository<ProductPrice>;

  constructor() {
    this.ormRepository = getRepository(ProductPrice);
  }

  public async findPriceByQuantity(productId: string, quantity: number): Promise<ProductPrice | undefined> {
    const productPrice = await this.ormRepository.findOne({
      where: {
        product_id: productId,
        quantidade_min: LessThanOrEqual(quantity),
        quantidade_max: MoreThanOrEqual(quantity),
      },
    });

    return productPrice || undefined;
  }

  public async findProductName(productId: string): Promise<{ nome: string }> {
    const productPrice = await this.ormRepository.findOne({
      where: { product_id: productId },
      relations: ['product'], // Carrega o relacionamento com a entidade Product
    });
  
    return { nome: productPrice?.product.nome || '' };
  }
}

export default ProductPricesRepository;
