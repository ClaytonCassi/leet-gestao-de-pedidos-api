import { inject, injectable } from 'tsyringe';

import Order from '../infra/typeorm/entities/Order';
import AppError from '../../../shared/errors/AppError';
import IOrderRepository from '../repositories/IOrderRepository';

@injectable()
class ShowOrderByCelularService {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrderRepository,
  ) {}

  public async execute(celular: string): Promise<Order[]> {
    const orders = await this.ordersRepository.findByCelular(celular);

    if (!orders || orders.length === 0) {
      throw new AppError('Pedido não encontrado com o celular informado.', 404);
    }

    return orders;
  }
}

export default ShowOrderByCelularService;
