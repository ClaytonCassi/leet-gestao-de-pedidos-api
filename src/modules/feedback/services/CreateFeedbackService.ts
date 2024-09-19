import { injectable, inject } from 'tsyringe';

import IFeedbackRepository from '../repositories/IFeedbackRepository';
import Feedback from '../infra/typeorm/entities/Feedback';

interface IRequest {
  pergunta: string;
  resposta: string;
}

@injectable()
class CreateFeedbackService {
  private feedbackRepository: IFeedbackRepository;

  constructor(
    @inject('FeedbackRepository')
    feedbackRepository: IFeedbackRepository,
  ) {
    this.feedbackRepository = feedbackRepository;
  }

  public async execute({ pergunta, resposta }: IRequest): Promise<Feedback> {
    const feedback = await this.feedbackRepository.create({
      pergunta,
      resposta
    });

    return feedback;
  }
}

export default CreateFeedbackService;
