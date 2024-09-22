import { injectable, inject } from 'tsyringe';
import IFeedbackRepository from '../../../modules/feedback/repositories/IFeedbackRepository';
import Feedback from '../../../modules/feedback/infra/typeorm/entities/Feedback';

interface IRequest {
  id: string;
  pergunta?: string;
  resposta?: string;
}

@injectable()
class UpdateFeedbackService {
  constructor(
    @inject('FeedbackRepository')
    private feedbackRepository: IFeedbackRepository,
  ) {}

  public async execute({ id, pergunta, resposta }: IRequest): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id);

    if (!feedback) {
      throw new Error('Feedback não encontrado.');
    }

    // Atualiza somente os campos fornecidos
    const updatedFeedback = await this.feedbackRepository.update(id, {
      ...feedback,
      pergunta: pergunta ?? feedback.pergunta,
      resposta: resposta ?? feedback.resposta,
    });

    return updatedFeedback;
  }
}

export default UpdateFeedbackService;
