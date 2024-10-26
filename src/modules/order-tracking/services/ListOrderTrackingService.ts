import { injectable, inject } from 'tsyringe';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import OrderTracking from '../infra/typeorm/entities/OrderTracking';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';

interface IRequest {
  startDate?: string;
  endDate?: string;
}

@injectable()
class ListOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute({ startDate, endDate }: IRequest): Promise<OrderTracking[]> {
    const timeZone = 'UTC';

    const parsedStartDate = startDate 
      ? startOfDay(toZonedTime(parseISO(startDate), timeZone)) 
      : undefined;

    const parsedEndDate = endDate 
      ? endOfDay(toZonedTime(parseISO(endDate), timeZone)) 
      : undefined;

    const orderTrackings = await this.orderTrackingRepository.findAllByDateRange(parsedStartDate, parsedEndDate);
    return orderTrackings;
  }
}

export default ListOrderTrackingService;
