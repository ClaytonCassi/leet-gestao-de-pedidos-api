// src/modules/graduationCommission/services/CreateGraduationCommissionService.ts

import { injectable, inject } from 'tsyringe';


import ICreateGraduationCommissionDTO from '../dtos/ICreateGraduationCommissionDTO';
import GraduationCommission from '../infra/typeorm/entities/GraduationCommission';
import IGraduationCommissionRepository from '../repositories/IGraduationCommissionRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import CreateLogService from '../../../modules/log/services/CreateLogService';


@injectable()
class CreateGraduationCommissionService {
  constructor(
    @inject('GraduationCommissionRepository')
    private graduationCommissionRepository: IGraduationCommissionRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CreateLogService')
    private createLogService: CreateLogService,
  ) {}

  public async execute(
    user_name: string,
    data: ICreateGraduationCommissionDTO,
    documentoAssinaturaFile?: Express.Multer.File
  ): Promise<GraduationCommission> {
    if (documentoAssinaturaFile) {
      if (!this.storageProvider.savePDF) {
        throw new Error('savePDF method is not implemented in storageProvider.');
      }
      data.documentoAssinaturaUrl = await this.storageProvider.savePDF(documentoAssinaturaFile);
    }
  
    const graduationCommission = await this.graduationCommissionRepository.create(data);
  
    // Criação do log
    await this.createLogService.execute({
      module: 'GraduationCommission',
      event: 'GraduationCommission Created',
      data: { graduationCommission },
      user_name,
    });
  
    return graduationCommission;
  }
}

export default CreateGraduationCommissionService;
