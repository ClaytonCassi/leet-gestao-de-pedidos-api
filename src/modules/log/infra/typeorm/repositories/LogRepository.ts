// src/modules/log/infra/typeorm/repositories/LogRepository.ts

import { getRepository, Repository } from 'typeorm';
import Log from '../entities/Log';
import { ILogRepository, ICreateLogDTO } from '@modules/log/repositories/ILogRepository';
import dataSource from '@shared/infra/typeorm/data-source';

class LogRepository implements ILogRepository {
  private ormRepository: Repository<Log>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Log);
  }

  public async create({ module, event, data, user_name }: ICreateLogDTO): Promise<Log> {
    const log = this.ormRepository.create({ module, event, data, user_name });
    await this.ormRepository.save(log);
    return log;
  }
}

export default LogRepository;
