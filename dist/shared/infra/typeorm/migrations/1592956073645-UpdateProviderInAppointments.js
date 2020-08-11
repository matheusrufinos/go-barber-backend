"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateProviderInAppointments1592956073645 {
  async up(queryRunner) {
    await queryRunner.dropColumns('appointments', [new _typeorm.TableColumn({
      name: 'provider',
      type: 'varchar'
    }), new _typeorm.TableColumn({
      name: 'id',
      type: 'varchar'
    })]);
    await queryRunner.addColumns('appointments', [new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }), new _typeorm.TableColumn({
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()'
    })]);
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumns('appointments', [new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid'
    }), new _typeorm.TableColumn({
      name: 'id',
      type: 'uuid'
    })]);
    await queryRunner.addColumns('appointments', [new _typeorm.TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: false
    }), new _typeorm.TableColumn({
      name: 'id',
      type: 'varchar',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()'
    })]);
  }

}

exports.default = UpdateProviderInAppointments1592956073645;