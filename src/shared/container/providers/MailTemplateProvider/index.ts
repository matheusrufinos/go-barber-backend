import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlerbarsMailTemplateProvider from './implementations/HandlerbarsMailTemplateProvider';

const providers = {
  handlebars: HandlerbarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
