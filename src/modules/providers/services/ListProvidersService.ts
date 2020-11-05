import { injectable, inject } from 'tsyringe';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

interface IRequest {
  desiredServices: number[];
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute(
    desiredServices: string | undefined,
  ): Promise<Provider[]> {
    const providers = await this.providersRepository.findAllProviders(
      desiredServices,
    );
    return providers;
  }
}

export default ListProvidersService;
