import { Repository } from 'typeorm';
import GraduationCommission from '../entities/GraduationCommission';
import Integrante from '../entities/Integrante';
import dataSource from '../../../../../shared/infra/typeorm/data-source';
import ICreateGraduationCommissionDTO from '../../../dtos/ICreateGraduationCommissionDTO';
import IGraduationCommissionRepository from '../../../repositories/IGraduationCommissionRepository';

class GraduationCommissionRepository implements IGraduationCommissionRepository {
  private ormRepository: Repository<GraduationCommission>;
  private integranteRepository: Repository<Integrante>;

  constructor() {
    this.ormRepository = dataSource.getRepository(GraduationCommission);
    this.integranteRepository = dataSource.getRepository(Integrante);
  }

  public async create(data: ICreateGraduationCommissionDTO): Promise<GraduationCommission> {
    const { integrantes, ...commissionData } = data;

    // Cria e salva a comissão
    const commission = this.ormRepository.create(commissionData);
    await this.ormRepository.save(commission);

    // Cria e salva os integrantes, associando à comissão
    if (integrantes && integrantes.length > 0) {
      const integrantesEntities = integrantes.map(integrante =>
        this.integranteRepository.create({
          ...integrante,
          graduationCommissionId: commission.id,
        }),
      );

      await this.integranteRepository.save(integrantesEntities);
    }

    return commission;
  }

  public async save(commission: GraduationCommission): Promise<GraduationCommission> {
    return this.ormRepository.save(commission);
  }

  public async findById(id: string): Promise<GraduationCommission | undefined> {
    const commission = await this.ormRepository.findOne({
      where: { id },
      relations: ['integrantes'], // Carrega os integrantes relacionados
    });
    return commission || undefined;
  }

  public async findAll(): Promise<GraduationCommission[]> {
    return this.ormRepository.find({
      relations: ['integrantes'], // Inclui os integrantes nas buscas
    });
  }

  public async delete(id: string): Promise<void> {
    await this.integranteRepository.delete({ graduationCommissionId: id }); // Exclui os integrantes
    await this.ormRepository.delete(id); // Exclui a comissão
  }
}

export default GraduationCommissionRepository;
