// src/modules/log/services/CreateLogService.ts

import { injectable, inject } from 'tsyringe';
import Log from '../infra/typeorm/entities/Log';
import { ILogRepository, ICreateLogDTO } from '../repositories/ILogRepository';

@injectable()
class CreateLogService {
  constructor(
    @inject('LogRepository')
    private logRepository: ILogRepository,
  ) {}

  public async execute({ module, event, data, user_name }: ICreateLogDTO): Promise<Log> {
    const log = await this.logRepository.create({ module, event, data, user_name });
    return log;
  }
}

export default CreateLogService;
