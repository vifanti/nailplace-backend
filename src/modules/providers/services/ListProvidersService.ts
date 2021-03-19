import { injectable, inject } from 'tsyringe';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

interface IRequest {
  desiredServices?: string;
  userId?: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    desiredServices,
    userId,
  }: IRequest): Promise<Provider[]> {
    const providers = await this.providersRepository.findProviders({
      desiredServices,
      userId,
    });
    return providers;
  }
}

export default ListProvidersService;
