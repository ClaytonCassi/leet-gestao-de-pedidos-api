// src/modules/order/services/UpdateOrderStatusService.ts

import { injectable, inject } from 'tsyringe';
import IOrdersRepository from '../repositories/IOrderRepository';
import IUpdateOrderStatusDTO from '../dtos/IUpdateOrderStatusDTO';
import CreateLogService from '../../../modules/log/services/CreateLogService';
import Order from '../infra/typeorm/entities/Order';

@injectable()
class UpdateOrderStatusService {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CreateLogService')
    private createLogService: CreateLogService,
  ) {}

  public async execute(
    { qrcode, status, setor }: IUpdateOrderStatusDTO,
    user_name: string
  ): Promise<Order> {
    const order = await this.ordersRepository.findByQrCode(qrcode);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    order.status = status;
    order.setor = setor;

    const updatedOrder = await this.ordersRepository.updateOrder(order);

    await this.createLogService.execute({
      module: 'Order',
      event: 'Status Updated',
      data: { 
        old_status: order.status,
        new_status: status,
        setor 
      },
      user_name,
    });

    return updatedOrder;
  }
}

export default UpdateOrderStatusService;