// src/modules/order/services/UpdatePagamentoVerificadoService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';

interface IRequest {
  id: string;
  status: 'não confirmado' | 'confirmado 50%' | 'confirmado 100%';
}

@injectable()
class UpdatePagamentoVerificadoService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id, status }: IRequest): Promise<Order> {
    // Busca o pedido pelo ID
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    // Atualiza o campo pagamentoVerificado
    order.pagamentoVerificado = status;

    // Salva as alterações no banco de dados
    await this.orderRepository.save(order);

    return order;
  }
}

export default UpdatePagamentoVerificadoService;
