"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddTimestampInAppointments1592954350790 {
  async up(queryRunner) {
    await queryRunner.addColumns('appointments', [new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }), new _typeorm.TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropColumns('appointments', [new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }), new _typeorm.TableColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: 'now()'
    })]);
  }

}

exports.default = AddTimestampInAppointments1592954350790;