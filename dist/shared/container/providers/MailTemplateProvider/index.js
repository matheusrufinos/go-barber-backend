"use strict";

var _tsyringe = require("tsyringe");

var _HandlerbarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HandlerbarsMailTemplateProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HandlerbarsMailTemplateProvider.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);