
import { injectable, inject } from 'tsyringe';

import IProductRepository from '../repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';




interface IRequest {
  nome: string;
  codigo: string;
  custo: string;
}

@injectable()
class CreateProductService {
  private productRepository: IProductRepository;

  constructor(
    @inject('ProductRepository')
    productRepository: IProductRepository,
  ) {
    this.productRepository = productRepository;
  }

  public async execute({
    nome,
    codigo,
    custo
  }: IRequest): Promise<Product> {
   

    const product = await this.productRepository.create({
      nome,
      codigo,
      custo
    });

    return product;
  }
}

export default CreateProductService;
