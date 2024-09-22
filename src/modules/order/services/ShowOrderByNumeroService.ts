// src/modules/order/services/ShowOrderByNumeroService.ts

import { injectable, inject } from 'tsyringe';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';

@injectable()
class ShowOrderByNumeroService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  // Método para buscar o pedido pelo numeroPedido
  public async execute(numeroPedido: string): Promise<Order | undefined> {
    // Padroniza o número para 6 caracteres com zeros à esquerda
    const numeroPadronizado = numeroPedido.padStart(6, '0');

    // Busca o pedido usando o número padronizado
    const order = await this.orderRepository.findByNumeroPedido(numeroPadronizado);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    return order;
  }
}

export default ShowOrderByNumeroService;
