import { inject, injectable } from 'tsyringe';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';
import OrderTracking from '../infra/typeorm/entities/OrderTracking';

@injectable()
class ShowOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute(id: string): Promise<OrderTracking | null> {
    const orderTracking = await this.orderTrackingRepository.findById(id);
    return orderTracking;
  }
}

export default ShowOrderTrackingService;
