import ProductPrice from "../../../modules/product-prices/infra/typeorm/entities/ProductPrice";



interface IProductPricesRepository {
  findPriceByQuantity(productId: string, quantity: number): Promise<ProductPrice | undefined>;
  findProductName(productId: string): Promise<{ nome: string }>;
}

export default IProductPricesRepository;
