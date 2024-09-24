// src/modules/log/repositories/ILogRepository.ts

import Log from '../infra/typeorm/entities/Log';

interface ICreateLogDTO {
  module: string;
  event: string;
  data?: any;
  user_name: string; 
}

interface ILogRepository {
  create(data: ICreateLogDTO): Promise<Log>;
}

export { ICreateLogDTO, ILogRepository };
