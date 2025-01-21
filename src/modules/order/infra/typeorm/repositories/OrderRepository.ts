import { Between, EntityManager, Repository } from 'typeorm';
import Order from '../../../../../modules/order/infra/typeorm/entities/Order';
import IOrderRepository from '../../../../../modules/order/repositories/IOrderRepository';
import ICreateOrderDTO from '../../../../../modules/order/dtos/ICreateOrderDTO';
import dataSource from '../../../../../shared/infra/typeorm/data-source';
import AdditionalPrice from '../../../../../modules/additional-prices/infra/typeorm/entities/AdditionalPrice';



class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  private additionalPriceRepository: Repository<AdditionalPrice>; // Repositório de preços adicionais

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
    this.additionalPriceRepository = dataSource.getRepository(AdditionalPrice);
  }

 public async create(data: ICreateOrderDTO): Promise<Order> {
  const orderData = {
    ...data,
    imagem: data.imagem ?? undefined,
  };



  // Para cada produto na ordem, calcule os valores dos adicionais
  for (const product of orderData.produtos) {
    if (product.adicionais && product.adicionais.length > 0) {
      for (const adicional of product.adicionais) {
        const priceRange = await this.additionalPriceRepository
          .createQueryBuilder('ap')
          .where('ap.additional_id = :adicionalId', { adicionalId: adicional.adicionalId })
          .andWhere('ap.quantidade_min <= :quantidade', { quantidade: product.quantidade })
          .andWhere('ap.quantidade_max IS NULL OR ap.quantidade_max >= :quantidade', {
            quantidade: product.quantidade,
          })
          .getOne();

        if (!priceRange) {
          throw new Error(`Nenhum preço encontrado para o adicional ${adicional.adicionalId}.`);
        }

        // Calcular e atribuir o valor ao adicional
        adicional.valor = priceRange.preco * product.quantidade;
      }
    }
  }

  const order = this.ormRepository.create(orderData);
  await this.ormRepository.save(order);
  return order;
}

  public async findLastOrder(): Promise<Order | undefined> {
    const order = await this.ormRepository
      .createQueryBuilder('order')
      .orderBy('order.numeroPedido', 'DESC')
      .getOne();
    return order || undefined;
  }

  public async save(order: Order): Promise<Order> {
    return await this.ormRepository.save(order);
  }
  public async findById(id: string, entityManager?: EntityManager): Promise<Order | undefined> {

    const queryBuilder = (entityManager || this.ormRepository).createQueryBuilder();
  
    const order = await queryBuilder
      .select("order")
      .from(Order, "order")
      .leftJoinAndSelect('order.produtos', 'produto')
      .leftJoinAndSelect('produto.adicionais', 'adicionais')
      .where('order.id = :id', { id })
      .getOne();
  
    return order || undefined;
  }

  public async findByNumeroPedido(numeroPedido: string): Promise<Order | undefined> {
    // Padroniza o número para 6 caracteres com zeros à esquerda
    const numeroPadronizado = numeroPedido.padStart(6, '0');
    
    const order = await this.ormRepository.findOne({
      where: { numeroPedido: numeroPadronizado },
    });
    return order || undefined;
  }


  public async update(orderId: string, data: Partial<ICreateOrderDTO>): Promise<Order> {
    const orderRepository = dataSource.getRepository(Order);  // Usando dataSource
  
    let order = await orderRepository.findOne({
      where: { id: orderId },
      relations: ["produtos", "produtos.adicionais"],
    });
  
    if (!order) {
      throw new Error('Pedido não encontrado.');
    }
  
    // Copia as propriedades de 'data' para 'order'
    Object.assign(order, data);
  
    // Tenta salvar o pedido atualizado
    try {
      await orderRepository.save(order);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao salvar o pedido atualizado.');
    }
  
    return order;
  }
  
  
  public async findByCelular(celular: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({ where: { celular } });
    return orders;
  }
  
  

  public async delete(id: string): Promise<void> {
    const order = await this.ormRepository.findOne({where: {id}});
    if (!order) {
      throw new Error('Pedido não encontrado para deletar.');
    }
    await this.ormRepository.remove(order);
  }


  public async findAllInDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: {
        dataPedido: Between(startDate, endDate),
      },
      relations: ['produtos'],
    });
    return orders;
  }
}

export default OrderRepository;
