"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ListProvidersService', () => {
  let fakeUsersRepository;
  let listProvidersService;
  let fakeCacheProvider;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvidersService = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Doi',
      email: 'john@doi.com',
      password: '123456'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Bob Construtor',
      email: 'bob@construtor.com',
      password: '123456'
    });
    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});