import ICreateAdditionalDTO from '../dtos/ICreateAdditionalDTO';
import Additional from '../infra/typeorm/entities/Additional';

interface IAdditionalRepository {
  create(data: ICreateAdditionalDTO): Promise<Additional>;
  save(additional: Additional): Promise<Additional>;
  findById(id: string): Promise<Additional | undefined>;
  findAll(): Promise<Additional[]>;
  update(id: string, data: Partial<Additional>): Promise<Additional>;
  delete(id: string): Promise<void>;
}

export default IAdditionalRepository;
