import AppError from '@shared/errors/AppError';
import FakeProvidersRepository from '@modules/providers/repositories/fakes/FakeProvidersRepository';
import CreateProviderService from '@modules/providers/services/CreateProviderService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProvidersRepository: FakeProvidersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createProvider: CreateProviderService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createProvider = new CreateProviderService(fakeProvidersRepository);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeProvidersRepository,
      fakeHashProvider,
    );
  });

  it('should be able authenticate and not return de provider id', async () => {
    const user = await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
    expect(response.provider).toBeUndefined();
  });

  it('should be able to authenticate and return the provider id', async () => {
    const user = await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const provider = await createProvider.execute({
      user_id: user.id,
      services_provided: [
        { id: 1, title: 'Manicure', image_url: 'imagemManicure' },
        {
          id: 2,
          title: 'Extensão de cílios',
          image_url: 'imagemExtensaoCilios',
        },
      ],
    });

    const response = await authenticateUser.execute({
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
    expect(response.provider).toEqual(provider);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'ricksanchez@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to authenticate with wrong password', async () => {
    await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'ricksanchez@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
