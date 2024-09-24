// src/modules/order/services/DeleteOrderService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import CreateLogService from '@modules/log/services/CreateLogService';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    
    @inject('CreateLogService')
    private createLogService: CreateLogService,
  ) {}

  public async execute(id: string, user_name: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    await this.orderRepository.delete(id);


    await this.createLogService.execute({
      module: 'Order',
      event: 'Order Deleted',
      data: { order },
      user_name, 
    });
    
  }
}

export default DeleteOrderService;
