import { Between, EntityManager, getRepository, Repository } from 'typeorm';
import Order from '@modules/order/infra/typeorm/entities/Order';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import dataSource from '@shared/infra/typeorm/data-source';



class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const orderData = {
      ...data,
      imagem: data.imagem ?? undefined,  // Converte null para undefined
    };
  
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
    const orderRepository = getRepository(Order);
    let order = await orderRepository.findOne({
      where: { id: orderId },
      relations: ["produtos", "produtos.adicionais"]
    });
  
    if (!order) {
      throw new Error('Pedido não encontrado.');
    }
  
    // A função Object.assign copia propriedades de 'data' para 'order'
    Object.assign(order, data);
    
    // O TypeORM cuidará do restante devido às configurações de cascata
    try {
      await orderRepository.save(order);
    } catch (error) {
      console.log(error)
    }
    await orderRepository.save(order);
    return order;
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
