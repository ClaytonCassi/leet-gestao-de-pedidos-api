import { Router } from 'express';
import { FeedbackController }  from '../controllers/FeedbackController';

const feedbackRouter = Router();
const feedbackController = new FeedbackController();

// Rota para criação de um novo feedback
feedbackRouter.post('/', feedbackController.create);

// Rota para listar todos os feedbacks
feedbackRouter.get('/', feedbackController.list);

// Rota para atualizar um feedback específico pelo id
feedbackRouter.patch('/:id', feedbackController.update);

// Rota para deletar um feedback específico pelo id
feedbackRouter.delete('/:id', feedbackController.delete);

// Rota para visualizar um feedback específico pelo id
feedbackRouter.get('/:id', feedbackController.show);

export default feedbackRouter;
