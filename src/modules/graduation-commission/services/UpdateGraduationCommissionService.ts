// src/modules/graduationCommission/services/UpdateGraduationCommissionService.ts

import { injectable, inject } from 'tsyringe';
import IGraduationCommissionRepository from '../repositories/IGraduationCommissionRepository';
import ICreateGraduationCommissionDTO from '../dtos/ICreateGraduationCommissionDTO';
import GraduationCommission from '../infra/typeorm/entities/GraduationCommission';

@injectable()
class UpdateGraduationCommissionService {
  constructor(
    @inject('GraduationCommissionRepository')
    private graduationCommissionRepository: IGraduationCommissionRepository,
  ) {}

  public async execute(id: string, data: Partial<ICreateGraduationCommissionDTO>): Promise<GraduationCommission> {
    const commission = await this.graduationCommissionRepository.findById(id);

    if (!commission) {
      throw new Error('Comissão de formatura não encontrada.');
    }

    Object.assign(commission, data);
    await this.graduationCommissionRepository.save(commission);

    return commission;
  }
}

export default UpdateGraduationCommissionService;
