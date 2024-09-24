import { getRepository, Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import IAdditionalPricesRepository from '@modules/price-calculator/repositories/IAdditionalPricesRepository';
import AdditionalPrice from '@modules/additional-prices/infra/typeorm/entities/AdditionalPrice';
import dataSource from '@shared/infra/typeorm/data-source';


class AdditionalPricesRepository implements IAdditionalPricesRepository {
  private ormRepository: Repository<AdditionalPrice>;

  constructor() {
    this.ormRepository = dataSource.getRepository(AdditionalPrice);
  }

  public async findPriceByQuantity(additionalId: string, quantity: number): Promise<AdditionalPrice | undefined> {
    const additionalPrice = await this.ormRepository.findOne({
      where: {
        additional_id: additionalId,
        quantidade_min: LessThanOrEqual(quantity),
        quantidade_max: MoreThanOrEqual(quantity),
      },
    });

    return additionalPrice ||  undefined;
  }

  public async findAdditionalName(additionalId: string): Promise<{ nome: string }> {
    const additionalPrice = await this.ormRepository.findOne({
      where: { id: additionalId },
      relations: ['additional'], 
    });
  
    return { nome: additionalPrice?.additional.nome || '' };
  }
  
}

export default AdditionalPricesRepository;
