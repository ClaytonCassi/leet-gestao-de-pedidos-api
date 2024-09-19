import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateFeedbackService from '@modules/feedback/services/CreateFeedbackService';
import ListFeedbackService from '@modules/feedback/services/ListFeedbacksService';
import UpdateFeedbackService from '@modules/feedback/services/UpdateFeedbackService';
import DeleteFeedbackService from '@modules/feedback/services/DeleteFeedbackService';
import ShowFeedbackService from '@modules/feedback/services/ShowFeedbackService';

class FeedbackController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { pergunta, resposta } = request.body;

    const createFeedback = container.resolve(CreateFeedbackService);

    const feedback = await createFeedback.execute({
      pergunta,
      resposta
    });

    return response.status(201).json(feedback);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listFeedback = container.resolve(ListFeedbackService);

    const feedbacks = await listFeedback.execute();

    return response.json(feedbacks);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { pergunta, resposta } = request.body;

    const updateFeedback = container.resolve(UpdateFeedbackService);

    const feedback = await updateFeedback.execute({
      id,
      pergunta,
      resposta
    });

    return response.json(feedback);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showFeedback = container.resolve(ShowFeedbackService);

    try {
      const feedback = await showFeedback.execute(id);

      if (!feedback) {
        return response.status(404).json({ message: 'Feedback não encontrado.' });
      }

      return response.json(feedback);
    } catch (error) {
      return response.status(500).json({ 
        message: 'Erro ao buscar o feedback', 
        error: (error as Error).message 
      });
    }
    
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteFeedback = container.resolve(DeleteFeedbackService);

    await deleteFeedback.execute(id);

    return response.status(204).send();
  }
}

export { FeedbackController };
