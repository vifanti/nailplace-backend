import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ICreateProviderDTO from '@modules/providers/dtos/iCreateProviderDTO';

import { uuid } from 'uuidv4';
import Provider from '../../infra/typeorm/entities/Provider';

class FakeProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = [];

  public async findById(id: string): Promise<Provider | undefined> {
    const foundProvider = this.providers.find(provider => provider.id === id);

    return foundProvider;
  }

  public async findByUserId(user_id: string): Promise<Provider | undefined> {
    const foundProvider = this.providers.find(
      provider => provider.user_id === user_id,
    );

    return foundProvider;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = new Provider();

    Object.assign(provider, {
      id: uuid(),
      ...providerData,
    });

    this.providers.push(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id,
    );

    this.providers[findIndex] = provider;

    return provider;
  }
}

export default FakeProvidersRepository;
