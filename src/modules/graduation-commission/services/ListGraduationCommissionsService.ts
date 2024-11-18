// src/modules/graduationCommission/services/ListGraduationCommissionsService.ts

import { injectable, inject } from 'tsyringe';
import IGraduationCommissionRepository from '../repositories/IGraduationCommissionRepository';
import GraduationCommission from '../infra/typeorm/entities/GraduationCommission';

@injectable()
class ListGraduationCommissionsService {
  constructor(
    @inject('GraduationCommissionRepository')
    private graduationCommissionRepository: IGraduationCommissionRepository,
  ) {}

  public async execute(): Promise<GraduationCommission[]> {
    const commissions = await this.graduationCommissionRepository.findAll();
    return commissions;
  }
}

export default ListGraduationCommissionsService;
