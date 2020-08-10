import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import IProvidersRepository from '../repositories/IProvidersRepository';

interface IService {
  id: number;
  title: string;
  image_url: string;
}

interface IRequest {
  user_id: string;
  services_provided: IService[];
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    user_id,
    services_provided,
  }: IRequest): Promise<Provider> {
    const checkUserIdExists = await this.providersRepository.findByUserId(
      user_id,
    );

    if (checkUserIdExists) {
      throw new AppError('This user already has a provider registration.');
    }

    const provider = await this.providersRepository.create({
      user_id,
      services_provided,
    });

    return provider;
  }
}

export default CreateProviderService;
