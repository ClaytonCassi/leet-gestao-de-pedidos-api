// src/modules/product/services/DeleteProductService.ts

import { injectable, inject } from 'tsyringe';

import IAdditionalRepository from '../repositories/IAdditionalRepository';

@injectable()
class DeleteAdditionalService {
  constructor(
    @inject('AdditionalRepository')
    private additionalRepository: IAdditionalRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const additional = await this.additionalRepository.findById(id);

    if (!additional) {
      throw new Error('Adicional não encontrado.');
    }

    await this.additionalRepository.delete(id);
  }
}

export default DeleteAdditionalService;
