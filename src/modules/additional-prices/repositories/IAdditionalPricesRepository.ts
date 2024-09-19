// IAdditionalPricesRepository.ts

import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';
import ICreateAdditionalPriceDTO from '../dtos/ICreateAdditionalPriceDTO';

interface IAdditionalPricesRepository {
  create(data: ICreateAdditionalPriceDTO): Promise<AdditionalPrice>;
  findAll(): Promise<AdditionalPrice[]>;
  findById(id: string): Promise<AdditionalPrice | undefined>;
  update(id: string, data: ICreateAdditionalPriceDTO): Promise<AdditionalPrice>;
  delete(id: string): Promise<void>;
  findPriceByQuantity(additionalId: string, quantity: number): Promise<AdditionalPrice | null | undefined>;
  findByAdditionalId(additionalId: string): Promise<AdditionalPrice[]>;
}

export default IAdditionalPricesRepository;
