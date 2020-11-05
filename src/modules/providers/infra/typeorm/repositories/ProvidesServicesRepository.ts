import { getRepository, Repository } from 'typeorm';

import IProvidesServicesRepository from '@modules/providers/repositories/IProvidesServicesRepository';
import iCreateProvidesServicesDTO from '@modules/providers/dtos/iCreateProvidesServicesDTO';

import ProvidesServices from '../entities/ProvidesServices';

class ProvidesServicesRepository implements IProvidesServicesRepository {
  private ormRepository: Repository<ProvidesServices>;

  constructor() {
    this.ormRepository = getRepository(ProvidesServices);
  }

  public async create(
    providesServicesData: iCreateProvidesServicesDTO[],
  ): Promise<ProvidesServices[]> {
    const providesServices = this.ormRepository.create(providesServicesData);

    await this.ormRepository.save(providesServices);

    return providesServices;
  }

  public async save(
    providesServices: ProvidesServices,
  ): Promise<ProvidesServices> {
    return this.ormRepository.save(providesServices);
  }
}

export default ProvidesServicesRepository;
