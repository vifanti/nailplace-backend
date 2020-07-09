import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Service from '@modules/users/infra/typeorm/entities/Service';

import IServicesRepository from '../repositories/IServicesRepository';

@injectable()
class ShowServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(): Promise<Service> {
    const services = await this.servicesRepository.find();

    if (!services) {
      throw new AppError('Services not found');
    }

    return services;
  }
}

export default ShowServiceService;
