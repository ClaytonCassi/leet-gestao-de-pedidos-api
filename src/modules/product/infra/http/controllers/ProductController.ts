import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../../../modules/product/services/CreateProductService';
import ListProductsService from '../../../../../modules/product/services/ListProductsService';
import UpdateProductService from '../../../../../modules/product/services/UpdateProductService';
import DeleteProductService from '../../../../../modules/product/services/DeleteProductService';
import ShowProductService from '../../../../../modules/product/services/ShowProductService';

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nomeProduto, codigoProduto, custoProduto } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      nome: nomeProduto,
      codigo: codigoProduto,
      custo: custoProduto,
    });

    return response.status(201).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { nomeProduto, codigoProduto, custoProduto } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      nome: nomeProduto,
      codigo: codigoProduto,
      custo: custoProduto,
    });

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    try {
      const product = await showProduct.execute(id);

      if (!product) {
        return response.status(404).json({ message: 'Produto não encontrado.' });
      }

      return response.json(product);
    } catch (error) {
      return response.status(500).json({ 
        message: 'Erro ao buscar o produto', 
        error: (error as Error).message 
      });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(id);

    return response.status(204).send();
  }
}

export { ProductsController };
