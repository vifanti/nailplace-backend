import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Rick Sanchez',
        cpf: '421.878.108-80',
        email: 'ricksanchez@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with same cpf from another', async () => {
    await createUser.execute({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Rick Sanchez',
        cpf: '421.878.108-79',
        email: 'ricksanchez2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
