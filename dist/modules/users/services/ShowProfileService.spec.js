"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ShowProfileService', () => {
  let fakeUsersRepository;
  let showProfileService;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const profile = await showProfileService.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@doe.com');
  });
  it('should not be able show the profile from non-existing user', async () => {
    expect(showProfileService.execute({
      user_id: 'non-existing-user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});