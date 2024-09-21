// ProductPricesRepository.ts

import { getRepository, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import IProductPricesRepository from '@modules/product-prices/repositories/IProductPricesRepository';
import ICreateProductPriceDTO from '@modules/product-prices/dtos/ICreateProductPriceDTO';
import ProductPrice from '../entities/ProductPrice';
import dataSource from '@shared/infra/typeorm/data-source';

class ProductPricesRepository implements IProductPricesRepository {
  private ormRepository: Repository<ProductPrice>;

  constructor() {
    this.ormRepository = dataSource.getRepository(ProductPrice);
  }

  public async create(data: ICreateProductPriceDTO): Promise<ProductPrice> {
    const productPrice = this.ormRepository.create(data);
    await this.ormRepository.save(productPrice);
    return productPrice;
  }

  public async findAll(): Promise<ProductPrice[]> {
    const productPrices = await this.ormRepository.find();
    return productPrices;
  }

  public async findById(id: string): Promise<ProductPrice | undefined> {
    const productPrice = await this.ormRepository.findOne({where: {id}});
    return productPrice || undefined;
  }

  public async update(id: string, data: ICreateProductPriceDTO): Promise<ProductPrice> {
    await this.ormRepository.update(id, data);
    const updatedProductPrice = await this.ormRepository.findOne({where: {id}});
    return updatedProductPrice!;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(productPrice: ProductPrice): Promise<ProductPrice> {
    return this.ormRepository.save(productPrice);
  }

  public async findByProductId(productId: string): Promise<ProductPrice[]> {
    const productPrices = await this.ormRepository.find({
      where: { product_id: productId },
    });
    
    return productPrices;
  }
  
  public async findPriceByQuantity(productId: string, quantity: number): Promise<ProductPrice | undefined> {
    const productPrice = await this.ormRepository.findOne({
      where: {
        product_id: productId,
        quantidade_min: LessThanOrEqual(quantity),
        quantidade_max: MoreThanOrEqual(quantity),
      },
      relations: ['product'],  // Inclua a relação para acessar o nome do produto
    });

    return productPrice || undefined;
  }
}

export default ProductPricesRepository;
