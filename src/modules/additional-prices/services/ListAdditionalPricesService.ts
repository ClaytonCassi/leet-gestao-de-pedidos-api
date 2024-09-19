import { inject, injectable } from 'tsyringe';
import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';
import IAdditionalPricesRepository from '../repositories/IAdditionalPricesRepository';

@injectable()
class ListAdditionalPricesService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute(): Promise<AdditionalPrice[]> {
    const additionalPrices = await this.additionalPricesRepository.findAll();
    return additionalPrices;
  }
}

export default ListAdditionalPricesService;
