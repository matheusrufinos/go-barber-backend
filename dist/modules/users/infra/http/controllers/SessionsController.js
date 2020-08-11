"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateService = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      user,
      token
    } = await authenticateService.execute({
      email,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = SessionController;