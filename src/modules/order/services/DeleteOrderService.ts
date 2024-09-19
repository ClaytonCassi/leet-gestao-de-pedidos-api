// src/modules/order/services/DeleteOrderService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    await this.orderRepository.delete(id);
  }
}

export default DeleteOrderService;
