import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import ICreateProductPriceDTO from '../dtos/ICreateProductPriceDTO';

interface IProductPricesRepository {
  create(data: ICreateProductPriceDTO): Promise<ProductPrice>;
  save(productPrice: ProductPrice): Promise<ProductPrice>;
  findAll(): Promise<ProductPrice[]>;
  findById(id: string): Promise<ProductPrice | undefined>;
  update(id: string, data: ICreateProductPriceDTO): Promise<ProductPrice>;
  delete(id: string): Promise<void>;
  findPriceByQuantity(productId: string, quantity: number): Promise<ProductPrice | undefined>;
  findByProductId(productId: string): Promise<ProductPrice[]>;

}

export default IProductPricesRepository;
