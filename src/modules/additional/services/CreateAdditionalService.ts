
import { injectable, inject } from 'tsyringe';


import Additional from '../infra/typeorm/entities/Additional';
import IAdditionalRepository from '../repositories/IAdditionalRepository';




interface IRequest {
  nome: string;
  codigo: string;
  custo: string;
}

@injectable()
class CreateAdditionalService {
  private additionalRepository: IAdditionalRepository;

  constructor(
    @inject('AdditionalRepository')
    additionalRepository: IAdditionalRepository,
  ) {
    this.additionalRepository = additionalRepository;
  }

  public async execute({
    nome,
    codigo,
    custo
  }: IRequest): Promise<Additional> {
   

    const additional = await this.additionalRepository.create({
      nome,
      codigo,
      custo
    });

    return additional;
  }
}

export default CreateAdditionalService;
