import AdditionalPrice from "../../../modules/additional-prices/infra/typeorm/entities/AdditionalPrice";


interface IAdditionalPricesRepository {
  findPriceByQuantity(additionalId: string, quantity: number): Promise<AdditionalPrice | undefined>;
  findAdditionalName(additionalId: string): Promise<{ nome: string }>;
}

export default IAdditionalPricesRepository;
