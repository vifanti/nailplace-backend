import { injectable, inject } from 'tsyringe';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

interface IRequest {
  desiredServices?: string;
  except_user_id?: string;
  user_id?: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
  ) {}

  public async execute({
    desiredServices,
    except_user_id,
    user_id,
  }: IRequest): Promise<Provider[]> {
    const providers = await this.providersRepository.findProviders({
      desiredServices,
      except_user_id,
      user_id,
    });

    return providers;
  }
}

export default ListProvidersService;
