import { Repository } from 'typeorm';

import OrderTracking from '../entities/OrderTracking';
import dataSource from '../../../../../shared/infra/typeorm/data-source';
import IOrderTrackingRepository from '../../../../../modules//order-tracking/repositories/IOrderTrackingRepository';
import ICreateOrderTrackingDTO from '../../../../../modules/order-tracking/dtos/ICreateOrderTrackingDTO';


class OrderTrackingRepository implements IOrderTrackingRepository {
  private ormRepository: Repository<OrderTracking>;

  constructor() {
    this.ormRepository = dataSource.getRepository(OrderTracking);
  }
  save(orderTracking: OrderTracking): Promise<OrderTracking> {
    throw new Error('Method not implemented.');
  }

  public async create(data: ICreateOrderTrackingDTO): Promise<OrderTracking> {
    const orderTracking = this.ormRepository.create(data);
    await this.ormRepository.save(orderTracking);
    return orderTracking;
  }

  public async findAllByDateRange(startDate?: Date, endDate?: Date): Promise<OrderTracking[]> {
    const query = this.ormRepository.createQueryBuilder('orderTracking');

    if (startDate) {
        query.andWhere('orderTracking.dataEnvio >= :startDate', { startDate });
    }

    if (endDate) {
  
        query.andWhere('orderTracking.dataEnvio <= :endDate', { endDate });
    }

    return await query.getMany();
}

  public async findAll(): Promise<OrderTracking[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<OrderTracking | null> {
    const orderTracking = await this.ormRepository.findOne({ where: { id } });
    return orderTracking || null;
  }

  public async update(id: string, data: Partial<OrderTracking>): Promise<OrderTracking> {
    let orderTracking = await this.ormRepository.findOne({ where: { id } });
    if (!orderTracking) {
      throw new Error('OrderTracking não encontrado.');
    }
    orderTracking = this.ormRepository.merge(orderTracking, data);
    await this.ormRepository.save(orderTracking);
    return orderTracking;
  }

  public async delete(id: string): Promise<void> {
    const orderTracking = await this.ormRepository.findOne({ where: { id } });
    if (!orderTracking) {
      throw new Error('OrderTracking não encontrado.');
    }
    await this.ormRepository.remove(orderTracking);
  }
}

export default OrderTrackingRepository;
