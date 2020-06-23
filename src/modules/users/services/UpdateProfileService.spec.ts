import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Morty',
      cpf: '421.878.108-80',
      email: 'morty@gmail.com',
    });

    expect(updateUser.name).toBe('Morty');
    expect(updateUser.cpf).toBe('421.878.108-80');
    expect(updateUser.email).toBe('morty@gmail.com');
  });

  it('should not be able to update profile with nonexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'nonexistent_id',
        name: 'Rick Sanchez',
        cpf: '421.878.108-79',
        email: 'ricksanchez@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the email to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Morty',
      cpf: '421.878.108-80',
      email: 'morty@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Morty',
        cpf: '421.878.108-80',
        email: 'ricksanchez@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the cpf to an existing cpf', async () => {
    await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Morty',
      cpf: '421.878.108-80',
      email: 'morty@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Morty',
        cpf: '421.878.108-79',
        email: 'morty@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password wihout old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Rick Sanchez',
        cpf: '421.878.108-79',
        email: 'ricksanchez@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password wihout wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rick Sanchez',
      cpf: '421.878.108-79',
      email: 'ricksanchez@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Rick Sanchez',
        cpf: '421.878.108-79',
        email: 'ricksanchez@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
