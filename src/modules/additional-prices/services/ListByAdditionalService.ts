import { injectable, inject } from 'tsyringe';
import IAdditionalPricesRepository from '../../../modules/additional-prices/repositories/IAdditionalPricesRepository';
import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';

interface IRequest {
  additionalId: string;
}

@injectable()
class ListByAdditionalService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute({ additionalId }: IRequest): Promise<AdditionalPrice[]> {
    const additionalPrices = await this.additionalPricesRepository.findByAdditionalId(additionalId);
    return additionalPrices;
  }
}

export default ListByAdditionalService;
