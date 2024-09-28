// src/modules/order/services/ShowOrderService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '../../../modules/order/repositories/IOrderRepository';
import Order from '../../../modules/order/infra/typeorm/entities/Order';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<Order | undefined> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    return order;
  }
}

export default ShowOrderService;
