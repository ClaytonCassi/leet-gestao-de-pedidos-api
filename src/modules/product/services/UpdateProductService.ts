// src/modules/product/services/UpdateProductService.ts
import { injectable, inject } from 'tsyringe';
import IProductRepository from '../../../modules/product/repositories/IProductRepository';
import Product from '../../../modules/product/infra/typeorm/entities/Product';

interface IRequest {
  id: string;
  nome?: string;
  codigo?: string;
  custo?: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id, nome, codigo, custo }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    // Atualiza somente os campos fornecidos
    const updatedProduct = await this.productRepository.update(id, {
      ...product,
      nome: nome ?? product.nome,
      codigo: codigo ?? product.codigo,
      custo: custo !== undefined ? custo.toString() : product.custo, 
    });

    return updatedProduct;
  }
}

export default UpdateProductService;
