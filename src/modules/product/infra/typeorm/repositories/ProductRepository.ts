import { getRepository, Repository } from 'typeorm';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';
import Product from '@modules/product/infra/typeorm/entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({ nome, codigo, custo }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      nome,
      codigo,
      custo,
    });
    await this.ormRepository.save(product);
    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ where: { id } });
    return product || undefined;
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async update(id: string, data: Partial<Product>): Promise<Product> {
    let product = await this.ormRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Produto não encontrado.');
    }
    product = this.ormRepository.merge(product, data);
    await this.ormRepository.save(product);
    return product;
  }

  public async delete(id: string): Promise<void> {
    const product = await this.ormRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new Error('Produto não encontrado para deletar.');
    }
  
    await this.ormRepository.remove(product);
  }
}

export default ProductRepository;
