import { injectable, inject } from 'tsyringe';
import IFeedbackRepository from '../../../modules/feedback/repositories/IFeedbackRepository';

@injectable()
class DeleteFeedbackService {
  constructor(
    @inject('FeedbackRepository')
    private feedbackRepository: IFeedbackRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const feedback = await this.feedbackRepository.findById(id);

    if (!feedback) {
      throw new Error('Feedback não encontrado.');
    }

    await this.feedbackRepository.delete(id);
  }
}

export default DeleteFeedbackService;
