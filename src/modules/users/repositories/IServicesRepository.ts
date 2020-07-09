import Service from '../infra/typeorm/entities/Service';

export default interface IUsersRepository {
  find(): Promise<Service[] | undefined>;
}
