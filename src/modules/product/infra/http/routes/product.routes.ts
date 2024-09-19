import { Router } from 'express';
import { ProductsController } from '../controllers/ProductController';

const productsRouter = Router();
const productsController = new ProductsController();

// Rota para criação de um novo produto
productsRouter.post('/', productsController.create);

// Rota para listar todos os produtos
productsRouter.get('/', productsController.list);

// Rota para atualizar um produto específico pelo id
productsRouter.patch('/:id', productsController.update);

// Rota para deletar um produto específico pelo id
productsRouter.delete('/:id', productsController.delete);

productsRouter.get('/:id', productsController.show);

export default productsRouter;
