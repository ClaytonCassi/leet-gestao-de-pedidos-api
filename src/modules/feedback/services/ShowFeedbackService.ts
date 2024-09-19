import { injectable, inject } from 'tsyringe';
import Feedback from '@modules/feedback/infra/typeorm/entities/Feedback';
import IFeedbackRepository from '@modules/feedback/repositories/IFeedbackRepository';

@injectable()
class ShowFeedbackService {
  constructor(
    @inject('FeedbackRepository')
    private feedbackRepository: IFeedbackRepository,
  ) {}

  public async execute(id: string): Promise<Feedback | undefined> {
    const feedback = await this.feedbackRepository.findById(id);
    return feedback;
  }
}

export default ShowFeedbackService;
