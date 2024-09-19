import { injectable, inject } from 'tsyringe';
import IFeedbackRepository from '@modules/feedback/repositories/IFeedbackRepository';
import Feedback from '@modules/feedback/infra/typeorm/entities/Feedback';

@injectable()
class ListFeedbacksService {
  constructor(
    @inject('FeedbackRepository')
    private feedbackRepository: IFeedbackRepository,
  ) {}

  public async execute(): Promise<Feedback[]> {
    return this.feedbackRepository.findAll();
  }
}

export default ListFeedbacksService;
