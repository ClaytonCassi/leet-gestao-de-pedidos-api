import { injectable, inject } from 'tsyringe';

import OrderTracking from '../infra/typeorm/entities/OrderTracking';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';

@injectable()
class ListOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute(): Promise<OrderTracking[]> {
    const orderTrackings = await this.orderTrackingRepository.findAll();
    return orderTrackings;
  }
}

export default ListOrderTrackingService;
