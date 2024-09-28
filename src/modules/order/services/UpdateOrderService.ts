import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import uploadConfig from '../../../config/storage';
import { getRepository } from 'typeorm';
import IOrderRepository from '../../../modules/order/repositories/IOrderRepository';
import Order from '../../../modules/order/infra/typeorm/entities/Order';
import ICreateOrderDTO, { IAdicionalDTO } from '../dtos/ICreateOrderDTO';
import OrderProduct from '../infra/typeorm/entities/OrderProduct';
import OrderProductAdditional from '../../../modules/product/infra/typeorm/entities/OrderProductAdditional';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestUpdate {
  id: string;
  fieldsToUpdate: Partial<ICreateOrderDTO>;
  file?: Express.Multer.File;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, fieldsToUpdate, file }: IRequestUpdate): Promise<Order> {
    let order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    // Atualizar produtos e seus adicionais
    const productUpdates = order.produtos.map(async (product) => {
      const updatedProduct = fieldsToUpdate.produtos?.find(p => p.id === product.id);
      if (updatedProduct?.adicionais) {
        await this.syncAdditionals(product, updatedProduct.adicionais);

        delete updatedProduct.adicionais;
      }
    });

    await Promise.all(productUpdates);

    // Se uma nova imagem for enviada, fazer o upload e atualizar a URL da imagem
    if (file) {
      const imageUrl = await this.uploadImage(file);
      fieldsToUpdate.imagem = imageUrl;
    }

    // Atualizar dados do pedido
    Object.assign(order, fieldsToUpdate);

    // Salvar as mudanças
    const orderRepo = getRepository(Order);
    try {
      await orderRepo.save(order);
    } catch (error) {
      throw new Error('Erro ao salvar as mudanças: ' + (error as Error).message);
    }

    return order;
  }

  private async syncAdditionals(itemProduct: OrderProduct, updatedAdditionals: IAdicionalDTO[]) {
    const additionalRepo = getRepository(OrderProductAdditional);
    await additionalRepo.delete({ orderProductId: itemProduct.id });

    for (const adicional of updatedAdditionals) {
      const newAdicional = additionalRepo.create({
        orderProductId: itemProduct.id,
        adicionalId: adicional.adicionalId
      });
      await additionalRepo.save(newAdicional);
    }
  }

  public async uploadImage(file: Express.Multer.File): Promise<string> {
    // Gerar o nome do arquivo seguindo o padrão desejado
    const date = new Date();
    const formattedDate = format(date, 'dd-MM-yyyy');
    const originalName = path.parse(file.originalname).name;
    const fileExtension = path.extname(file.originalname);
    const newFileName = `leet-${formattedDate}-${originalName}${fileExtension}`;

    // Caminho do arquivo temporário
    const filePath = path.resolve(uploadConfig.tmpFolder, newFileName);
    
    // Escrever o arquivo no caminho temporário
    await fs.promises.writeFile(filePath, file.buffer);
    
    // Salvar o arquivo no S3 e obter a URL
    const fileUrl = await this.storageProvider.saveFile(newFileName);
    
    // Remover o arquivo temporário
    await fs.promises.unlink(filePath);

    return fileUrl;
  }
}

export default UpdateOrderService;
