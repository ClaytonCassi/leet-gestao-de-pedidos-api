import { inject, injectable } from 'tsyringe';
import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';
import IAdditionalPricesRepository from '../repositories/IAdditionalPricesRepository';

interface IRequest {
  additional_id: string;
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: number;
}

@injectable()
class CreateAdditionalPriceService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute({ additional_id, faixa, quantidade_min, quantidade_max, preco }: IRequest): Promise<AdditionalPrice> {
    const additionalPrice = await this.additionalPricesRepository.create({
      additional_id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
    });

    return additionalPrice;
  }
}

export default CreateAdditionalPriceService;
