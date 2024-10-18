import { injectable, inject } from 'tsyringe';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';
import OrderTracking from '../infra/typeorm/entities/OrderTracking';
import ICreateOrderTrackingDTO from '../dtos/ICreateOrderTrackingDTO';

@injectable()
class CreateOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute(data: ICreateOrderTrackingDTO): Promise<OrderTracking> {
    const orderTracking = await this.orderTrackingRepository.create(data);
    return orderTracking;
  }
}

export default CreateOrderTrackingService;
