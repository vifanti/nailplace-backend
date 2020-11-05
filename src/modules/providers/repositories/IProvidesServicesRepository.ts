import ProvidesServices from '../infra/typeorm/entities/ProvidesServices';
import ICreateProvidesServicesDTO from '../dtos/iCreateProvidesServicesDTO';

export default interface IProvidesServicesRepository {
  create(data: ICreateProvidesServicesDTO[]): Promise<ProvidesServices[]>;
}
