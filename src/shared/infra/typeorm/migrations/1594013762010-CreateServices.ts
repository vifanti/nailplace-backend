import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import Service from '@modules/providers/infra/typeorm/entities/Service';
import ServicesSeed from '../seeds/services.seed';

export default class CreateServices1594013762010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'image_url',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.commitTransaction();

    await queryRunner.startTransaction();

    const userRepo = queryRunner.connection.getRepository(Service);

    await userRepo.insert(ServicesSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
