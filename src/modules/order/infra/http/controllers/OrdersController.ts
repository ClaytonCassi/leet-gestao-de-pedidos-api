import { Request, Response } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import CreateOrderService from '../../../../../modules/order/services/CreateOrderService';
import ListOrdersService from '../../../../../modules/order/services/ListOrdersByDateRangeService';
import UpdateOrderService from '../../../../../modules/order/services/UpdateOrderService';
import DeleteOrderService from '../../../../../modules/order/services/DeleteOrderService';
import ShowOrderService from '../../../../../modules/order/services/ShowOrderService';
import ICreateOrderDTO, { IOrderProductDTO } from '../../../../../modules/order/dtos/ICreateOrderDTO';
import ShowOrderByNumeroService from '../../../../../modules/order/services/ShowOrderByNumeroService';
import UpdatePagamentoVerificadoService from '../../../../../modules/order/services/UpdatePagamentoVerificadoService';
import ShowOrderByCelularService from '../../../../../modules/order/services/ShowOrderByCelularService';

// Configuração do Multer para armazenar arquivos em memória
const upload = multer({ storage: multer.memoryStorage() });

type Adicionais = {
  id?: string;
  adicionalId: string;
  orderProductId?: string;
}

type Produto = {
  id?: string | undefined;
  productId: string;
  nome: string;
  quantidade: number;
  adicionais: Adicionais[];
  valorUnitario: string | number;
};

function converterValorMonetarioParaNumero(valorMonetario: any): number {
  const valorConvertido = parseFloat(valorMonetario.replace(',', '.'));
  return valorConvertido;
}

class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const {
      cliente,
      dataPedido,
      celular,
      numeroArte,
      dataEvento,
      valorFrete,
      cep,
      prazo,
      rua,
      valorTotal,
      valorSinal,
      faltaPagar,
      dataEntrega,
      observacao,
      formaPagamento,
      nomeVendedor,
      nomeDesigner, 
    } = request.body;

    const userName = (request.headers['x-user-name'] as string) || '';

    let imagemPedidoUrl: string | null = null;

    if (request.file) {
      imagemPedidoUrl = await createOrder.uploadImage(request.file);
    }

    const produtos: IOrderProductDTO[] = [];
    Object.keys(request.body)
      .filter(key => key.startsWith('produtos['))
      .forEach(key => {
        const matchProduto = key.match(/^produtos\[(\d+)\]\.(id|nome|productId|quantidade|valorUnitario)$/);
        const matchAdicionais = key.match(/^produtos\[(\d+)\]\.adicionais\[(\d+)\]$/);

        if (matchProduto) {
          const idx = parseInt(matchProduto[1], 10);
          const field = matchProduto[2] as keyof Produto;
          const value = request.body[key];

          produtos[idx] = produtos[idx] || { nome: '', productId: '', quantidade: 0, adicionais: [], valorUnitario: 0 };

          if (field === 'valorUnitario') {
            produtos[idx][field] = converterValorMonetarioParaNumero(value);
          } else {
            produtos[idx][field] = value as never;
          }
        } else if (matchAdicionais) {
          const idx = parseInt(matchAdicionais[1], 10);
          const adicionalIdx = parseInt(matchAdicionais[2], 10);
          const adicionalData = JSON.parse(request.body[key]);

          produtos[idx].adicionais![adicionalIdx] = adicionalData;
        }
      });

    const orderData: ICreateOrderDTO = {
      cliente,
      dataPedido,
      celular,
      produtos,
      numeroArte,
      dataEvento,
      valorFrete: converterValorMonetarioParaNumero(valorFrete),
      cep,
      prazo,
      rua,
      valorTotal: converterValorMonetarioParaNumero(valorTotal),
      valorSinal: converterValorMonetarioParaNumero(valorSinal),
      faltaPagar: converterValorMonetarioParaNumero(faltaPagar),
      dataEntrega,
      observacao,
      formaPagamento,
      imagem: imagemPedidoUrl,
      nomeVendedor,
      nomeDesigner,
    };

    const order = await createOrder.execute(orderData, userName);

    return response.status(200).json(order);
  }
  
  
  
  public async update(request: Request, response: Response): Promise<Response> {
    const updateOrderService = container.resolve(UpdateOrderService);
  
    const { id } = request.params;
    let imagemPedidoUrl: string | null = null;
    if (request.file) {
      imagemPedidoUrl = await updateOrderService.uploadImage(request.file);
    }
  
    const produtos: Produto[] = [];
    Object.keys(request.body).forEach(key => {
      const matchProduto = key.match(/^produtos\[(\d+)\]\.(id|orderId|productId|nome|quantidade|valorUnitario)$/);
      const matchAdicionais = key.match(/^produtos\[(\d+)\]\.adicionais\[(\d+)\]$/);
  
      if (matchProduto) {
        const idx = parseInt(matchProduto[1], 10);
        const field = matchProduto[2] as keyof Produto;
        const value = request.body[key];
  
        produtos[idx] = produtos[idx] || { id: '', orderId: '', productId: '', nome: '', quantidade: 0, adicionais: [], valorUnitario: '0' };
        if (field === 'valorUnitario') {
          produtos[idx][field] = converterValorMonetarioParaNumero(value);
        } else {
          produtos[idx][field] = value as never;
        }
      } else if (matchAdicionais) {
        const idx = parseInt(matchAdicionais[1], 10);
        const adicionalIdx = parseInt(matchAdicionais[2], 10);
        const adicionalData = JSON.parse(request.body[key]);
  
        produtos[idx].adicionais[adicionalIdx] = adicionalData;
      }
    });
  
    const fieldsToUpdate = {
      ...request.body,
      produtos,
      formaPagamento: request.body.formaPagamento,
      numeroPedido: request.body.numeroPedido, 
      nomeVendedor: request.body.nomeVendedor, 
      nomeDesigner: request.body.nomeDesigner,
    };

    const userName = (request.headers['x-user-name'] as string) || '';

    if (imagemPedidoUrl) {
      fieldsToUpdate.imagem = imagemPedidoUrl;
    }
  
    try {
      const updatedOrder = await updateOrderService.execute({ id, fieldsToUpdate }, userName);
      return response.json(updatedOrder);
    } catch (error) {
      return response.status(404).json({ message: 'Pedido não encontrado.' });
    }
  }
  
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrderService = container.resolve(DeleteOrderService);

    const userName = (request.headers['x-user-name'] as string) || '';
  
    try {
      await deleteOrderService.execute(id, userName);
      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ message: 'Pedido não encontrado.' });
    }
  }

  public async showByCelular(request: Request, response: Response): Promise<Response> {
    const { celular } = request.params;
    const showOrderByCelular = container.resolve(ShowOrderByCelularService);
  
    try {
      const orders = await showOrderByCelular.execute(celular);
      return response.json(orders);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Erro desconhecido' });
    }
  }
  
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = container.resolve(ShowOrderService);
  
    try {
      const order = await showOrder.execute(id);
      return response.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Erro desconhecido' });
    }
  }

  public async showByNumeroPedido(request: Request, response: Response): Promise<Response> {
    const { numeroPedido } = request.params;
    const showOrderByNumero = container.resolve(ShowOrderByNumeroService);

    try {
      // Usa o serviço recém-criado para buscar pelo numeroPedido
      const order = await showOrderByNumero.execute(numeroPedido);
      return response.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Erro desconhecido' });
    }
  }
  
  public async list(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query;
  
    if (
      typeof startDate !== 'string' ||
      isNaN(Date.parse(startDate)) ||
      typeof endDate !== 'string' ||
      isNaN(Date.parse(endDate))
    ) {
      return response
        .status(400)
        .json({ message: 'Data inválida ou não fornecida' });
    }
  
    // Converter strings para objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const listOrders = container.resolve(ListOrdersService);
    const orders = await listOrders.execute(start, end);
  
    return response.json(orders);
  }

  public async updatePagamentoVerificado(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body; // Recebe o novo status do pagamento

    const updatePagamentoVerificado = container.resolve(UpdatePagamentoVerificadoService);

    try {
      // Executa o serviço para atualizar o pagamento verificado
      const order = await updatePagamentoVerificado.execute({ id, status });
      return response.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Erro desconhecido' });
    }
  }
  
}

export { upload, OrdersController };
