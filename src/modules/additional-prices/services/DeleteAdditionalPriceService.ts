import { inject, injectable } from 'tsyringe';
import IAdditionalPricesRepository from '../repositories/IAdditionalPricesRepository';

@injectable()
class DeleteAdditionalPriceService {
  constructor(
    @inject('AdditionalPricesRepository')
    private additionalPricesRepository: IAdditionalPricesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.additionalPricesRepository.delete(id);
  }
}

export default DeleteAdditionalPriceService;
