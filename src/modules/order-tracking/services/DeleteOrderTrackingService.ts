import { injectable, inject } from 'tsyringe';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';

@injectable()
class DeleteOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.orderTrackingRepository.delete(id);
  }
}

export default DeleteOrderTrackingService;
