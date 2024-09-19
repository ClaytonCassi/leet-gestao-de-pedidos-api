// AdditionalPricesRepository.ts

import { getRepository, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import IAdditionalPricesRepository from '@modules/additional-prices/repositories/IAdditionalPricesRepository';
import ICreateAdditionalPriceDTO from '@modules/additional-prices/dtos/ICreateAdditionalPriceDTO';
import AdditionalPrice from '../entities/AdditionalPrice';

class AdditionalPricesRepository implements IAdditionalPricesRepository {
  private ormRepository: Repository<AdditionalPrice>;

  constructor() {
    this.ormRepository = getRepository(AdditionalPrice);
  }

  public async create(data: ICreateAdditionalPriceDTO): Promise<AdditionalPrice> {
    const additionalPrice = this.ormRepository.create(data);
    await this.ormRepository.save(additionalPrice);
    return additionalPrice;
  }

  public async findAll(): Promise<AdditionalPrice[]> {
    const additionalPrices = await this.ormRepository.find();
    return additionalPrices;
  }

  public async findById(id: string): Promise<AdditionalPrice | undefined> {
    const additionalPrice = await this.ormRepository.findOne({ where: { id } });
    return additionalPrice || undefined;
  }

  public async update(id: string, data: ICreateAdditionalPriceDTO): Promise<AdditionalPrice> {
    await this.ormRepository.update(id, data);
    const updatedAdditionalPrice = await this.ormRepository.findOne({ where: { id } });
    return updatedAdditionalPrice!;
  }

  public async findByAdditionalId(additionalId: string): Promise<AdditionalPrice[]> {
    const additionalPrices = await this.ormRepository.find({
      where: { additional_id: additionalId },
    });
    
    return additionalPrices;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findPriceByQuantity(additionalId: string, quantity: number): Promise<AdditionalPrice | null | undefined> {
    const additionalPrice = await this.ormRepository.findOne({
      where: {
        additional_id: additionalId,
        quantidade_min: LessThanOrEqual(quantity),
        quantidade_max: MoreThanOrEqual(quantity),
      },
      relations: ['additional'],  
    });
  
    return additionalPrice;
  }
  
}

export default AdditionalPricesRepository;
