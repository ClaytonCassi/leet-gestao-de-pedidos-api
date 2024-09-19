// src/modules/product/services/ListProductsService.ts

import { injectable, inject } from 'tsyringe';
import Additional from '../infra/typeorm/entities/Additional';
import IAdditionalRepository from '../repositories/IAdditionalRepository';

@injectable()
class ListAdditionalService {
  constructor(
    @inject('AdditionalRepository')
    private additionalRepository: IAdditionalRepository,
  ) {}

  public async execute(): Promise<Additional[]> {
    return this.additionalRepository.findAll();
  }
}

export default ListAdditionalService;
