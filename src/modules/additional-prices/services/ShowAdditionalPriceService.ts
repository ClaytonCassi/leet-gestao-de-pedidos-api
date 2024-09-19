import { inject, injectable } from 'tsyringe';
import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';
import IAdditionalPricesRepository from '../repositories/IAdditionalPricesRepository';

@injectable()
class ShowAdditionalPriceService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute(id: string): Promise<AdditionalPrice | undefined> {
    const additionalPrice = await this.additionalPricesRepository.findById(id);
    return additionalPrice;
  }
}

export default ShowAdditionalPriceService;
