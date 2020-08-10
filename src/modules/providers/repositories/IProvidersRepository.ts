import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/iCreateProviderDTO';

export default interface IProvidersRepository {
  findById(id: string): Promise<Provider | undefined>;
  findByUserId(user_id: string): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(data: Provider): Promise<Provider>;
}
