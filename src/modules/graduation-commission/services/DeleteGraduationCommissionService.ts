// src/modules/graduationCommission/services/DeleteGraduationCommissionService.ts

import { injectable, inject } from 'tsyringe';
import IGraduationCommissionRepository from '../repositories/IGraduationCommissionRepository';
import CreateLogService from '../../log/services/CreateLogService';

@injectable()
class DeleteGraduationCommissionService {
  constructor(
    @inject('GraduationCommissionRepository')
    private graduationCommissionRepository: IGraduationCommissionRepository,

    @inject('CreateLogService')
    private createLogService: CreateLogService,
  ) {}

  public async execute(id: string, user_name: string): Promise<void> {
    const commission = await this.graduationCommissionRepository.findById(id);

    if (!commission) {
      throw new Error('Comissão de formatura não encontrada.');
    }

    await this.graduationCommissionRepository.delete(id);

    await this.createLogService.execute({
      module: 'GraduationCommission',
      event: 'Commission Deleted',
      data: { commission },
      user_name,
    });
  }
}

export default DeleteGraduationCommissionService;
