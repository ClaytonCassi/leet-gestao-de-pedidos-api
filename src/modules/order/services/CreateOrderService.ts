import { injectable, inject } from 'tsyringe';
import IOrdersRepository from '../../../modules/order/repositories/IOrderRepository';
import Order from '../../../modules/order/infra/typeorm/entities/Order';
import OrderProduct from '../../../modules/order/infra/typeorm/entities/OrderProduct';
import OrderProductAdditional from '../../../modules/product/infra/typeorm/entities/OrderProductAdditional';
import ICreateOrderDTO from '../../../modules/order/dtos/ICreateOrderDTO';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../config/storage';
import { format } from 'date-fns';
import CreateLogService from '../../../modules/log/services/CreateLogService';

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private ordersRepository: IOrdersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CreateLogService')
    private createLogService: CreateLogService,
  ) {}

  public async execute({
    cliente,
    dataPedido,
    celular,
    produtos,
    numeroArte,
    dataEvento,
    valorFrete,
    cep,
    prazo,
    rua,
    valorTotal,
    imagem,
    valorSinal,
    faltaPagar,
    dataEntrega,
    observacao,
    formaPagamento,
    nomeVendedor,
  }: ICreateOrderDTO, user_name: string): Promise<Order> {
    // Obter o último pedido
    const lastOrder = await this.ordersRepository.findLastOrder();
    let numeroPedido = '000001'; // Número inicial padrão

    if (lastOrder && lastOrder.numeroPedido) {
      const lastOrderNumber = parseInt(lastOrder.numeroPedido, 10);
      if (!isNaN(lastOrderNumber)) {
        numeroPedido = (lastOrderNumber + 1).toString().padStart(6, '0');
      } else {
        console.error(`Failed to parse last order number: ${lastOrder.numeroPedido}`);
      }
    }
    console.log(`Generated order number: ${numeroPedido + ' '}` + `${ format(Date.now(), 'dd-MM-yyyy HH:mm:ss')}` );

    const orderProducts = produtos.map(produto => {
      const product = new OrderProduct();
      product.productId = produto.productId;
      product.nome = produto.nome;
      product.quantidade = produto.quantidade;
      product.valorUnitario = produto.valorUnitario;

      if (produto.adicionais) {
        product.adicionais = produto.adicionais.map(adicional => {
          const productAdditional = new OrderProductAdditional();
          productAdditional.adicionalId = adicional.adicionalId;
          return productAdditional;
        });
      }

      return product;
    });

    const order = new Order();
    order.cliente = cliente;
    order.dataPedido = dataPedido;
    order.celular = celular;
    order.produtos = orderProducts;
    order.numeroArte = numeroArte;
    order.dataEvento = dataEvento;
    order.valorFrete = valorFrete;
    order.cep = cep;
    order.prazo = prazo;
    order.rua = rua;
    order.valorTotal = valorTotal;
    order.imagem = imagem || '';
    order.valorSinal = valorSinal;
    order.faltaPagar = faltaPagar;
    order.dataEntrega = dataEntrega;
    order.observacao = observacao;
    order.formaPagamento = formaPagamento;
    order.numeroPedido = numeroPedido; 
    order.nomeVendedor = nomeVendedor || ''; 

    await this.ordersRepository.save(order);


    await this.createLogService.execute({
      module: 'Order',
      event: 'Order Created',
      data: { order },
      user_name, 
    });

    return order;

  }

  public async uploadImage(file: Express.Multer.File): Promise<string> {
    const date = new Date();
    const formattedDate = format(date, 'dd-MM-yyyy');
    const originalName = path.parse(file.originalname).name;
    const fileExtension = path.extname(file.originalname);
    const newFileName = `leet-${formattedDate}-${originalName}${fileExtension}`;

    const filePath = path.resolve(uploadConfig.tmpFolder, newFileName);
    
    await fs.promises.writeFile(filePath, file.buffer);
    const fileUrl = await this.storageProvider.saveFile(newFileName);
    await fs.promises.unlink(filePath);

    return fileUrl;
  }
}

export default CreateOrderService;
