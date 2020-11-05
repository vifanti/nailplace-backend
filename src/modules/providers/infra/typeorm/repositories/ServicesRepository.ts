import { getRepository, Repository } from 'typeorm';

import IServicesRepository from '@modules/providers/repositories/IServicesRepository';

import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async find(): Promise<Service[] | undefined> {
    const services = await this.ormRepository.find({ order: { id: 'ASC' } });

    return services;
  }
}

export default ServicesRepository;
