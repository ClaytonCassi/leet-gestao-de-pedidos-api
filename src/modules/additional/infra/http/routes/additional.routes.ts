import { Router } from 'express';
import { AdditionalController } from '../controllers/AdditionalController';

const additionalRouter = Router();
const additionalController = new AdditionalController();

// Rota para criação de um novo produto
additionalRouter.post('/', additionalController.create);

// Rota para listar todos os produtos
additionalRouter.get('/', additionalController.list);

// Rota para atualizar um produto específico pelo id
additionalRouter.patch('/:id', additionalController.update);

// Rota para deletar um produto específico pelo id
additionalRouter.delete('/:id', additionalController.delete);

export default additionalRouter;
