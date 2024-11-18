import { injectable, inject } from 'tsyringe';
import IOrdersRepository from '../../../modules/order/repositories/IOrderRepository';
import Order from '../../../modules/order/infra/typeorm/entities/Order';
import OrderProduct from '../../../modules/order/infra/typeorm/entities/OrderProduct';
import OrderProductAdditional from '../../../modules/product/infra/typeorm/entities/OrderProductAdditional';
import ICreateOrderDTO from '../../../modules/order/dtos/ICreateOrderDTO';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import { v4 as uuidv4 } from 'uuid';

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
    nomeDesigner,
    comissaoFormaturaId,
    tipoDesconto,
    padraoDesconto, 

  }: ICreateOrderDTO, user_name: string): Promise<Order> {
    const lastOrder = await this.ordersRepository.findLastOrder();
    let numeroPedido = '000001';

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
    order.nomeDesigner = nomeDesigner || '';
    order.padraoDesconto = padraoDesconto || '';
    order.tipoDesconto = tipoDesconto || null;
    order.comissaoFormaturaId = comissaoFormaturaId || undefined;

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
    const originalName = path.parse(file.originalname).name.replace(/\s+/g, '');
    const fileExtension = path.extname(file.originalname);
  
    const uniqueId = uuidv4();
    const newFileName = `leet-${formattedDate}-${originalName}-${uniqueId}${fileExtension}`;
  
    const filePath = path.resolve(uploadConfig.tmpFolder, newFileName);
  
    try {
      // Escreve o arquivo temporário
      await fs.promises.writeFile(filePath, file.buffer);
  
      // Salva o arquivo no provedor de armazenamento
      const fileUrl = await this.storageProvider.saveFile(newFileName);
  
      // Verifica se o arquivo existe antes de excluí-lo
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        console.warn(`Arquivo temporário não encontrado para exclusão: ${filePath}`);
      }
  
      return fileUrl;
    } catch (error) {
      console.error('Erro durante o upload da imagem:', error);
      throw new Error('Erro ao processar a imagem. Tente novamente.');
    }
  } 
}

export default CreateOrderService;
