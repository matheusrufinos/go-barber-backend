"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AuthenticateUser', () => {
  let fakeUsersRepository;
  let fakeHashProvider;
  let authenticateUser;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    expect(authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    expect(authenticateUser.execute({
      email: 'john@doe.com',
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});