import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/iCreateProviderDTO';

export default interface IProvidersRepository {
  findById(id: string): Promise<Provider | undefined>;
  findByUserId(user_id: string): Promise<Provider | undefined>;
  findAllProviders(desiredServices: string | undefined): Promise<Provider[]>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(data: Provider): Promise<Provider>;
}
