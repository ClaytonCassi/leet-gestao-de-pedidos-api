// src/modules/feedback/infra/typeorm/repositories/FeedbackRepository.ts

import { getRepository, Repository } from 'typeorm';
import IFeedbackRepository from '@modules/feedback/repositories/IFeedbackRepository';
import ICreateFeedbackDTO from '@modules/feedback/dtos/ICreateFeedbackDTO';
import Feedback from '@modules/feedback/infra/typeorm/entities/Feedback';

class FeedbackRepository implements IFeedbackRepository {
  private ormRepository: Repository<Feedback>;

  constructor() {
    this.ormRepository = getRepository(Feedback);
  }

  public async create({ pergunta, resposta }: ICreateFeedbackDTO): Promise<Feedback> {
    const feedback = this.ormRepository.create({
      pergunta,
      resposta,
    });
    await this.ormRepository.save(feedback);
    return feedback;
  }

  public async save(feedback: Feedback): Promise<Feedback> {
    return this.ormRepository.save(feedback);
  }

  public async findById(id: string): Promise<Feedback | undefined> {
    const feedback = await this.ormRepository.findOne({ where: { id } });
    return feedback || undefined;
  }
  

  public async findAll(): Promise<Feedback[]> {
    return this.ormRepository.find();
  }

  public async update(id: string, data: Partial<Feedback>): Promise<Feedback> {
    let feedback = await this.ormRepository.findOne({where: {id}});
    if (!feedback) {
      throw new Error('Feedback não encontrado.');
    }
    feedback = this.ormRepository.merge(feedback, data);
    await this.ormRepository.save(feedback);
    return feedback;
  }

  public async delete(id: string): Promise<void> {
    const feedback = await this.ormRepository.findOne({where: {id}});
    if (!feedback) {
      throw new Error('Feedback não encontrado para deletar.');
    }
    await this.ormRepository.remove(feedback);
  }
}

export default FeedbackRepository;
