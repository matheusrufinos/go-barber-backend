"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateProfileService', () => {
  let fakeUsersRepository;
  let fakeHashProvider;
  let updateProfileService;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doi',
      email: 'johndoi@example.com'
    });
    expect(updatedUser.name).toBe('John Doi');
    expect(updatedUser.email).toBe('johndoi@example.com');
  });
  it('should not be able show the profile from non-existing user', async () => {
    expect(updateProfileService.execute({
      user_id: 'non-existing-user',
      name: 'John Doi',
      email: 'john@doi.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'John Doi',
      email: 'johndoi@example.com',
      password: '123456'
    });
    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doi',
      email: 'john@doe.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doi',
      email: 'johndoi@example.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doi',
      email: 'johndoi@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Doi',
      email: 'johndoi@example.com',
      old_password: 'wrong-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});