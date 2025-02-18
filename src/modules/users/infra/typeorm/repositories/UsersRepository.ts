import { Repository, Not } from 'typeorm';
import User from '../../../../../modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../../../../../modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../../../../../modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../../../../../modules/users/dtos/IFindAllProvidersDTO';
import dataSource from '../../../../../shared/infra/typeorm/data-source';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({
    name,
    email,
    password,
    role,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password, role });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
  
    return user || undefined;
  }
  

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
  
    return user || undefined;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: { id: Not(except_user_id) },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }
}

export default UsersRepository;
