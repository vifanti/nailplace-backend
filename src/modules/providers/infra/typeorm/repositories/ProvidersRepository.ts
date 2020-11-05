import { getRepository, Repository } from 'typeorm';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ICreateProviderDTO from '@modules/providers/dtos/iCreateProviderDTO';
// import IFindAllProvidersDTO from '@modules/providers/dtos/IFindAllProvidersDTO';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne(id);

    return provider;
  }

  public async findByUserId(userId: string): Promise<Provider | undefined> {
    const provider = await this.ormRepository.findOne({
      where: { user_id: userId },
    });

    return provider;
  }

  public async findAllProviders(desiredServices: string): Promise<Provider[]> {
    let providers: Provider[];

    if (desiredServices) {
      providers = await this.ormRepository
        .createQueryBuilder('providers')
        .leftJoin('providers.providesServices', 'providesServices')
        .leftJoinAndSelect('providers.user', 'user')
        .where(`providesServices.service_id IN (${desiredServices})`)
        .getMany();
    } else {
      providers = await this.ormRepository.find();
    }
    return providers;
  }

  public async create(providerData: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create(providerData);

    await this.ormRepository.save(provider);

    return provider;
  }

  public async save(provider: Provider): Promise<Provider> {
    return this.ormRepository.save(provider);
  }
}

export default ProvidersRepository;
