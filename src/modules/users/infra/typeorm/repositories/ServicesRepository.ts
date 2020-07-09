import { getRepository, Repository } from 'typeorm';

import IServicesRepository from '@modules/users/repositories/IServicesRepository';

import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async find(): Promise<Service[] | undefined> {
    const services = await this.ormRepository.find();

    return services;
  }
}

export default ServicesRepository;
