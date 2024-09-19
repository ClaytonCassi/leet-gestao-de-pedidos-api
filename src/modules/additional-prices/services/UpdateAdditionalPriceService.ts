import { inject, injectable } from 'tsyringe';
import AdditionalPrice from '../infra/typeorm/entities/AdditionalPrice';
import IAdditionalPricesRepository from '../repositories/IAdditionalPricesRepository';

interface IRequest {
  id: string;
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: number;
}

@injectable()
class UpdateAdditionalPriceService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute({ id, faixa, quantidade_min, quantidade_max, preco }: IRequest): Promise<AdditionalPrice> {
 
    const existingAdditionalPrice = await this.additionalPricesRepository.findById(id);

    if (!existingAdditionalPrice) {
      throw new Error('Faixa de preço do adicional não encontrada.');
    }

    const additionalPrice = await this.additionalPricesRepository.update(id, {
      additional_id: existingAdditionalPrice.additional_id, 
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
    });

    return additionalPrice;
  }
}

export default UpdateAdditionalPriceService;
