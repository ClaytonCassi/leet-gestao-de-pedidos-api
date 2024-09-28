// src/modules/order/services/ListOrdersByDateRangeService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '../../../modules/order/repositories/IOrderRepository';
import Order from '../../../modules/order/infra/typeorm/entities/Order';
import { format } from 'date-fns';

@injectable()
class ListOrdersByDateRangeService {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrderRepository,
  ) {}

  public async execute(startDate: Date, endDate: Date): Promise<Order[]> {

    console.log(`${format(new Date(), 'dd-MM-yyyy HH:mm:ss')} Datas do service:`, { startDate, endDate });


    return this.ordersRepository.findAllInDateRange(startDate, endDate);
  }
}

export default ListOrdersByDateRangeService;
