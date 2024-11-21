// FindGraduationCommissionService.ts

import { injectable, inject } from 'tsyringe';
import GraduationCommission from '../infra/typeorm/entities/GraduationCommission';
import IGraduationCommissionRepository from '../repositories/IGraduationCommissionRepository';

@injectable()
class FindGraduationCommissionService {
  constructor(
    @inject('GraduationCommissionRepository')
    private graduationCommissionRepository: IGraduationCommissionRepository,
  ) {}

  public async execute(id: string): Promise<GraduationCommission | undefined> {
    return this.graduationCommissionRepository.findById(id); // Busca no repositório
  }
}

export default FindGraduationCommissionService;
