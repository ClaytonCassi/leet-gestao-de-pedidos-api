import Order from '../../../modules/order/infra/typeorm/entities/Order';
import ICreateOrderDTO from '../../../modules/order/dtos/ICreateOrderDTO';
import { EntityManager } from 'typeorm';



export default interface IOrderRepository {
  findById(id: string, transactionEntityManager?: EntityManager): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  save(order: Order): Promise<ICreateOrderDTO>;
  update(id: string, data: Partial<ICreateOrderDTO>): Promise<Order>;
  delete(id: string): Promise<void>;
  findAllInDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
  findLastOrder(): Promise<Order | undefined>;
  findByNumeroPedido(numeroPedido: string): Promise<Order | undefined>;
  findByCelular(celular: string): Promise<Order[]>;
  findAllInEventDateRange(startDate: Date, endDate: Date): Promise<Order[]>;
  findByQrCode(qrcode: string): Promise<Order | undefined | null>;
  updateOrder(order: Order): Promise<Order>;
}
