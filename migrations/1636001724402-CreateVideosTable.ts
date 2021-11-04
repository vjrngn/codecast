import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'videos';

export class CreateVideosTable1636001724402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'url',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true
        },
        {
          name: 'publised_at',
          type: 'timestamp',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'NOW()'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
