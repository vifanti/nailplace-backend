import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeProvidersRepository from '../repositories/fakes/FakeProvidersRepository';
import CreateProviderService from './CreateProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProvidersRepository: FakeProvidersRepository;
let fakeHashProvider: FakeHashProvider;
let createProvider: CreateProviderService;
let createUser: CreateUserService;

describe('CreateProvider', () => {
  beforeEach(() => {
    fakeProvidersRepository = new FakeProvidersRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createProvider = new CreateProviderService(fakeProvidersRepository);
  });

  it('should be able to create a new provider', async () => {
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

    expect(provider).toHaveProperty('id');
    expect(provider.user_id).toBe(user.id);
  });

  it('should not be able to create a new provider with same user id from another', async () => {
    const user = await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await createProvider.execute({
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

    await expect(
      createProvider.execute({
        user_id: user.id,
        services_provided: [
          { id: 1, title: 'Manicure', image_url: 'imagemManicure' },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
