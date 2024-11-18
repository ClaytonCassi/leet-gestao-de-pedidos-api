import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderTrackingService from '../../../services/CreateOrderTrackingService';
import ListOrderTrackingService from '../../../services/ListOrderTrackingService';
import UpdateOrderTrackingService from '../../../services/UpdateOrderTrackingService';
import DeleteOrderTrackingService from '../../../services/DeleteOrderTrackingService';
import ShowOrderTrackingService from '../../../../../modules/order-tracking/services/ShowOrderTrackingService';

class OrderTrackingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { 
      nomeVendedor, 
      nomeFuncionarioArte, 
      dataEnvio, 
      statusPagamento, 
      nomeCliente,
      celularCliente 
    } = request.body;

    const createOrderTracking = container.resolve(CreateOrderTrackingService);

    const orderTracking = await createOrderTracking.execute({
      nomeVendedor,
      nomeFuncionarioArte,
      dataEnvio,
      statusPagamento,
      nomeCliente, 
      celularCliente, 
    });

    return response.status(201).json(orderTracking);
  }
  
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderTracking = container.resolve(ShowOrderTrackingService);

    const orderTracking = await showOrderTracking.execute(id);

    if (!orderTracking) {
      return response.status(404).json({ message: 'Acompanhamento não encontrado.' });
    }

    return response.json(orderTracking);
  }
  
  public async list(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate, vendedor, designer } = request.query;
    const listOrderTracking = container.resolve(ListOrderTrackingService);

    const orderTrackings = await listOrderTracking.execute({
        startDate: startDate as string,
        endDate: endDate as string,
        vendedor: vendedor as string,
        designer: designer as string,
    });

    return response.json(orderTrackings);
}


  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { 
      nomeVendedor, 
      nomeFuncionarioArte, 
      dataEnvio, 
      statusPagamento, 
      nomeCliente,
      celularCliente
    } = request.body;

    const updateOrderTracking = container.resolve(UpdateOrderTrackingService);

    const orderTracking = await updateOrderTracking.execute({
      id,
      nomeVendedor,
      nomeFuncionarioArte,
      dataEnvio,
      statusPagamento,
      nomeCliente, // Passa o novo campo
      celularCliente, // Passa o novo campo
    });

    return response.json(orderTracking);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrderTracking = container.resolve(DeleteOrderTrackingService);

    await deleteOrderTracking.execute(id);

    return response.status(204).send();
  }
}

export default OrderTrackingController;
