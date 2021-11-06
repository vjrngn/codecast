import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME = 'courses';

export class CreateCoursesTable1636011131503 implements MigrationInterface {

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
					name: 'description',
					type: 'text',
					isNullable: true
				},
				{
					name: 'publish_at',
					type: 'timestamp',
					isNullable: true
				},
				{
					name: 'listed_price',
					type: 'integer',
					default: 0
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
