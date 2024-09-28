import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ProductPrice from '../infra/typeorm/entities/ProductPrice';
import IProductPricesRepository from '../repositories/IProductPricesRepository';

interface IRequest {
  id: string;
  faixa: string;
  quantidade_min: number;
  quantidade_max: number | null;
  preco: number;
  height: number;
  width: number;
  depth: number;
  weight: number;
  volume: number;
  stackable: boolean;
  stackingFactor?: number;
  pairing_height?: number; 
  pairing_width?: number;   
  pairing_depth?: number;  
}

@injectable()
class UpdateProductPriceService {
  constructor(
    @inject('ProductPricesRepository')
    private productPricesRepository: IProductPricesRepository,
  ) {}

  public async execute({
    id,
    faixa,
    quantidade_min,
    quantidade_max,
    preco,
    height,
    width,
    depth,
    weight,
    volume,
    stackable,
    stackingFactor,
    pairing_height,  
    pairing_width,
    pairing_depth,
  }: IRequest): Promise<ProductPrice> {
    const productPrice = await this.productPricesRepository.findById(id);

    if (!productPrice) {
      throw new AppError('Product price not found');
    }

    // Atualiza os campos no banco de dados
    productPrice.faixa = faixa;
    productPrice.quantidade_min = quantidade_min;
    productPrice.quantidade_max = quantidade_max;
    productPrice.preco = preco;
    productPrice.height = height;
    productPrice.width = width;
    productPrice.depth = depth;
    productPrice.weight = weight;
    productPrice.volume = volume;
    productPrice.stackable = stackable;

    if (stackingFactor !== undefined) {
      productPrice.stackingFactor = stackingFactor;
    }

    // Atualiza os novos campos de emparelhamento
    productPrice.pairing_height = pairing_height ?? 0;
    productPrice.pairing_width = pairing_width ?? 0;
    productPrice.pairing_depth = pairing_depth ?? 0;

    await this.productPricesRepository.save(productPrice);

    return productPrice;
  }
}

export default UpdateProductPriceService;
