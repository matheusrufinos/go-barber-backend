"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateUserAvatar', () => {
  let fakeUsersRepository;
  let fakeStorageProvider;
  let updateUserAvatar;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_file_name: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    expect(updateUserAvatar.execute({
      user_id: 'non-existing-id',
      avatar_file_name: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete existent avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_file_name: 'avatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_file_name: 'avatar-updated.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar-updated.jpg');
  });
});