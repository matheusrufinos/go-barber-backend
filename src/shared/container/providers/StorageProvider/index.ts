import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import DiskStorgeProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorgeProvider,
};

container.registerSingleton<IStorageProvider>(
  'DiskStorgeProvider',
  providers.disk,
);
