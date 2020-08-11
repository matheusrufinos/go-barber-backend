"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPasswordService;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPasswordService = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: '123456oi',
      token
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123456oi');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123456oi');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPasswordService.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPasswordService.execute({
      password: '123456oi',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});