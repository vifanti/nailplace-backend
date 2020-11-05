import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/providers/infra/typeorm/repositories/ProvidersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IServicesRepository from '@modules/providers/repositories/IServicesRepository';
import ServicesRepository from '@modules/providers/infra/typeorm/repositories/ServicesRepository';

import IProvidesServicesRepository from '@modules/providers/repositories/IProvidesServicesRepository';
import ProvidesServicesRepository from '@modules/providers/infra/typeorm/repositories/ProvidesServicesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);

container.registerSingleton<IProvidesServicesRepository>(
  'ProvidesServicesRepository',
  ProvidesServicesRepository,
);
