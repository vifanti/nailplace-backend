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
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        phoneNumber: '+5519974077194',
        name: 'Rick Sanchez',
        email: 'ricksanchez@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create a new user if phone number and email is registered in different entries', async () => {
  //   await createUser.execute({
  //     phoneNumber: '+5519974077193',
  //     name: 'Rick Sanchez',
  //     email: 'ricksanchez@gmail.com',
  //     password: '123456',
  //   });

  //   const error1 = await createUser.execute({
  //     phoneNumber: '+5519974077193',
  //     name: 'Morty Smith',
  //     email: 'mortysmith@gmail.com',
  //     password: '123456',
  //   });

  //   const error2 = await createUser.execute({
  //     phoneNumber: '+5519974077194',
  //     name: 'Rick Sanchez',
  //     email: 'ricksanchez@gmail.com',
  //     password: '123456',
  //   });

  //   await expect(error1).rejects.toBeInstanceOf(AppError);
  //   await expect(error2).rejects.toBeInstanceOf(AppError);
  // });

  it('should not be able to create a new user with same phone number from another', async () => {
    await createUser.execute({
      phoneNumber: '+5519974077193',
      name: 'Rick Sanchez',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        phoneNumber: '+5519974077193',
        name: 'Rick Sanchez',
        email: 'ricksanchez2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
