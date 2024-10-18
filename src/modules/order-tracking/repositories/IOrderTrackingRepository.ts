import OrderTracking from '../infra/typeorm/entities/OrderTracking';
import ICreateOrderTrackingDTO from '../dtos/ICreateOrderTrackingDTO';

interface IOrderTrackingRepository {
  create(data: ICreateOrderTrackingDTO): Promise<OrderTracking>;
  save(orderTracking: OrderTracking): Promise<OrderTracking>;
  findById(id: string): Promise<OrderTracking | null> 
  findAll(): Promise<OrderTracking[]>;
  update(id: string, data: Partial<OrderTracking>): Promise<OrderTracking>;
  delete(id: string): Promise<void>;
}

export default IOrderTrackingRepository;
