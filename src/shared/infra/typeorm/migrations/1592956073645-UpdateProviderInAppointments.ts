import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class UpdateProviderInAppointments1592956073645
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('appointments', [
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'id',
        type: 'varchar',
      }),
    ]);
    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    ]);

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumns('appointments', [
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
      }),
      new TableColumn({
        name: 'id',
        type: 'uuid',
      }),
    ]);

    await queryRunner.addColumns('appointments', [
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
      new TableColumn({
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    ]);
  }
}
