// src/modules/graduationCommission/repositories/IGraduationCommissionRepository.ts

import GraduationCommission from '../infra/typeorm/entities/GraduationCommission';
import ICreateGraduationCommissionDTO from '../dtos/ICreateGraduationCommissionDTO';

interface IGraduationCommissionRepository {
  create(data: ICreateGraduationCommissionDTO): Promise<GraduationCommission>;
  save(commission: GraduationCommission): Promise<GraduationCommission>;
  findById(id: string): Promise<GraduationCommission | undefined>;
  findAll(): Promise<GraduationCommission[]>;
  delete(id: string): Promise<void>;
}

export default IGraduationCommissionRepository;
