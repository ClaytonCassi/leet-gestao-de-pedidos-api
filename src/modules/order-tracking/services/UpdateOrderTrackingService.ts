import { injectable, inject } from 'tsyringe';
import IOrderTrackingRepository from '../repositories/IOrderTrackingRepository';
import OrderTracking from '../infra/typeorm/entities/OrderTracking';

interface IRequest {
  id: string;
  nomeVendedor?: string;
  nomeFuncionarioArte?: string;
  dataEnvio?: Date;
  statusPagamento?: string;
  nomeCliente?: string 
  celularCliente?: string
}

@injectable()
class UpdateOrderTrackingService {
  constructor(
    @inject('OrderTrackingRepository')
    private orderTrackingRepository: IOrderTrackingRepository,
  ) {}

  public async execute({ id, ...data }: IRequest): Promise<OrderTracking> {
    const orderTracking = await this.orderTrackingRepository.update(id, data);
    return orderTracking;
  }
}

export default UpdateOrderTrackingService;
