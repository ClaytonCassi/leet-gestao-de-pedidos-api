import Feedback from '../../../modules/feedback/infra/typeorm/entities/Feedback';
import ICreateFeedbackDTO from '../../../modules/feedback/dtos/ICreateFeedbackDTO';

interface IFeedbackRepository {
  create(data: ICreateFeedbackDTO): Promise<Feedback>;
  save(feedback: Feedback): Promise<Feedback>;
  findById(id: string): Promise<Feedback | undefined>;
  findAll(): Promise<Feedback[]>;
  update(id: string, data: Partial<Feedback>): Promise<Feedback>;
  delete(id: string): Promise<void>;
}

export default IFeedbackRepository;
