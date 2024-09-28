import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductPriceService from '../../../../../modules/product-prices/services/CreateProductPriceService';
import ListProductPricesService from '../../../../../modules/product-prices/services/ListProductPricesService';
import UpdateProductPriceService from '../../../../../modules/product-prices/services/UpdateProductPriceService';
import DeleteProductPriceService from '../../../../../modules/product-prices/services/DeleteProductPriceService';
import ShowProductPriceService from '../../../../../modules/product-prices/services/ShowProductPriceService';
import ListProductPricesByProductService from '../../../../../modules/product-prices/services/ListProductPricesByProductService';

class ProductPricesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product_id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
      height,
      width,
      depth,
      weight,
      volume,
      stackable,
      stackingFactor,
      pairing_height,
      pairing_width,  
      pairing_depth,   
    } = request.body;
  
    const createProductPrice = container.resolve(CreateProductPriceService);
  
    const productPrice = await createProductPrice.execute({
      product_id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
      height,
      width,
      depth,
      weight,
      volume,
      stackable,
      stackingFactor,
      pairing_height, 
      pairing_width,  
      pairing_depth, 
    });
  
    return response.status(201).json(productPrice);
  }
  

  public async list(request: Request, response: Response): Promise<Response> {
    const listProductPrices = container.resolve(ListProductPricesService);

    const productPrices = await listProductPrices.execute();

    return response.json(productPrices);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
      height,
      width,
      depth,
      weight,
      volume,
      stackable,
      stackingFactor,
      pairing_height,
      pairing_width,  
      pairing_depth, 
    } = request.body;
  
    const updateProductPrice = container.resolve(UpdateProductPriceService);
  
    const productPrice = await updateProductPrice.execute({
      id,
      faixa,
      quantidade_min,
      quantidade_max,
      preco,
      height,
      width,
      depth,
      weight,
      volume,
      stackable,
      stackingFactor,
      pairing_height,
      pairing_width,   
      pairing_depth, 
    });
  
    return response.json(productPrice);
  }
  

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductPrice = container.resolve(ShowProductPriceService);

    try {
      const productPrice = await showProductPrice.execute(id);

      if (!productPrice) {
        return response.status(404).json({ message: 'Faixa de preço do produto não encontrada.' });
      }

      return response.json(productPrice);
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar a faixa de preço do produto', error: (error as Error).message  });
    }
  }

  public async listByProduct(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;

    const listProductPricesByProduct = container.resolve(ListProductPricesByProductService);

    const productPrices = await listProductPricesByProduct.execute(productId);

    return response.json(productPrices);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductPrice = container.resolve(DeleteProductPriceService);

    await deleteProductPrice.execute(id);

    return response.status(204).send();
  }
}

export { ProductPricesController };
