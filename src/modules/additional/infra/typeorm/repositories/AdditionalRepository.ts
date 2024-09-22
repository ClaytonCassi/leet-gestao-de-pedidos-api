import {  Repository } from 'typeorm';

import Additional from '../../../../../modules/additional/infra/typeorm/entities/Additional';
import ICreateAdditionalDTO from '../../../../../modules/additional/dtos/ICreateAdditionalDTO';
import IAdditionalRepository from '../../../../../modules/additional/repositories/IAdditionalRepository';
import dataSource from '../../../../../shared/infra/typeorm/data-source';

class AdditionalRepository implements IAdditionalRepository {
  private ormRepository: Repository<Additional>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Additional);
  }

  public async create({ nome, codigo, custo }: ICreateAdditionalDTO): Promise<Additional> {
    const additional = this.ormRepository.create({
      nome,
      codigo,
      custo,
    });
    await this.ormRepository.save(additional);
    return additional;
  }

  public async save(additional: Additional): Promise<Additional> {
    return this.ormRepository.save(additional);
  }

  public async findById(id: string): Promise<Additional | undefined> {
    const additional = await this.ormRepository.findOne({ where: { id } });
    return additional || undefined;
  }
  

  public async findAll(): Promise<Additional[]> {
    return this.ormRepository.find();
  }

  public async update(id: string, data: Partial<Additional>): Promise<Additional> {
    let additional = await this.ormRepository.findOne({where: {id}});
    if (!additional) {
      throw new Error('Adicional não encontrado.');
    }
    additional = this.ormRepository.merge(additional, data);
    await this.ormRepository.save(additional);
    return additional;
  }

  public async delete(id: string): Promise<void> {
    const additional = await this.ormRepository.findOne({where: {id}});
    if (!additional) {
      throw new Error('Adicional não encontrado para deletar.');
    }
    await this.ormRepository.remove(additional);
  }
}

export default AdditionalRepository;
