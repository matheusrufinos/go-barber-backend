"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = _interopRequireWildcard(require("date-fns"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let CreateAppoinmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppoinmentService {
  constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    provider_id,
    user_id,
    date
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new _AppError.default("You can't create an appointment with yourself");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default('You can only create appointment between 8am and 5pm');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    });
    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd 'de' MMMM 'às' HH:mm'h", {
      locale: _dateFns.default
    });
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento na data ${dateFormatted}.`
    });
    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppoinmentService;
exports.default = _default;