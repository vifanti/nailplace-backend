import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import ProvidesServices from '@modules/providers/infra/typeorm/entities/ProvidesServices';
import IProvidersRepository from '../repositories/IProvidersRepository';
import IProvidesServicesRepository from '../repositories/IProvidesServicesRepository';

interface IRequest {
  user_id: string;
  latitude: number;
  longitude: number;
  services: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('ProvidesServicesRepository')
    private providesServicesRepository: IProvidesServicesRepository,
  ) {}

  public async execute({
    user_id,
    latitude,
    longitude,
    services,
  }: IRequest): Promise<Provider> {
    const checkUserIdExists = await this.providersRepository.findByUserId(
      user_id,
    );

    if (checkUserIdExists) {
      throw new AppError('This user already has a provider registration.');
    }

    const provider = await this.providersRepository.create({
      user_id,
      latitude,
      longitude,
    });

    let providesServices: ProvidesServices[] = [];

    if (provider) {
      const provider_id = provider.id;

      const servicesProvided = services
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((service_id: number) => {
          return {
            provider_id,
            service_id,
          };
        });

      providesServices = await this.providesServicesRepository.create(
        servicesProvided,
      );
    }

    return { ...provider, providesServices };
  }
}

export default CreateProviderService;
