import { injectable, inject } from 'tsyringe';
import Order from '../infra/typeorm/entities/Order';
import IOrderRepository from '../repositories/IOrderRepository';

interface IRequest {
  startDate: Date;
  endDate: Date;
}

@injectable()
class ListOrdersByEventDateRangeService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ startDate, endDate }: IRequest): Promise<Order[]> {
    const orders = await this.orderRepository.findAllInEventDateRange(
      startDate,
      endDate,
    );

    return orders;
  }
}

export default ListOrdersByEventDateRangeService;
