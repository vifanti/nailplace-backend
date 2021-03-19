import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/iCreateProviderDTO';
import IFilterProvidersDTO from '../dtos/iFilterProvidersDTO';

export default interface IProvidersRepository {
  findById(id: string): Promise<Provider | undefined>;
  findByUserId(user_id: string): Promise<Provider | undefined>;
  findProviders(filters: IFilterProvidersDTO): Promise<Provider[]>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  save(data: Provider): Promise<Provider>;
}
