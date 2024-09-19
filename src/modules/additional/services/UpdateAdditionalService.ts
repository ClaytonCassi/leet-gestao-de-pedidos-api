// src/modules/product/services/UpdateProductService.ts

import { injectable, inject } from 'tsyringe';

import Additional from '../infra/typeorm/entities/Additional';
import IAdditionalRepository from '../repositories/IAdditionalRepository';

interface IRequest {
  id: string;
  nome?: string;
  codigo?: string;
  custo?: string;
}

@injectable()
class UpdateAdditionalService {
  constructor(
    @inject('AdditionalRepository')
    private additionalRepository: IAdditionalRepository,
  ) {}

  public async execute({ id, nome, codigo, custo }: IRequest): Promise<Additional> {
    const additional = await this.additionalRepository.findById(id);

    if (!additional) {
      throw new Error('Produto não encontrado.');
    }

    // Atualiza somente os campos fornecidos
    const updatedAdditional = await this.additionalRepository.update(id, {
      ...additional,
      nome: nome ?? additional.nome,
      codigo: codigo ?? additional.codigo,
      custo: custo ?? additional.custo,
    });

    return updatedAdditional;
  }
}

export default UpdateAdditionalService;
