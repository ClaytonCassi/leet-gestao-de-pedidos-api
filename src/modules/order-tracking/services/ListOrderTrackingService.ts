import { injectable, inject } from 'tsyringe';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import OrderTracking from '../infra/typeorm/entities/OrderTracking';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';

interface IRequest {
  startDate?: string;
  endDate?: string;
  vendedor?: string;
  designer?: string;
}

@injectable()
class ListOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute({ startDate, endDate, vendedor, designer }: IRequest): Promise<OrderTracking[]> {
    const timeZone = 'UTC';

    const parsedStartDate = startDate 
      ? startOfDay(toZonedTime(parseISO(startDate), timeZone)) 
      : undefined;

    const parsedEndDate = endDate 
      ? endOfDay(toZonedTime(parseISO(endDate), timeZone)) 
      : undefined;

      const orderTrackings = await this.orderTrackingRepository.findAllByDateRange(
        parsedStartDate, 
        parsedEndDate, 
        vendedor, 
        designer
      );
    return orderTrackings;
  }
}

export default ListOrderTrackingService;
