import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLanches1609273688307 implements MigrationInterface {
	
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "lanches",
			columns: [
				{
					name: "id",
					type: "integer",
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: "increment"
				},
				{
					name: "name",
					type: "varchar"
				},
				{
					name: "price",
					type: "real"
				},
				{
					name: "image",
					type: "varchar"
				},
				{
					name: "category_id",
					type: "integer"
				}
			]
		}))
	}
	
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("lanches")
	}
	
}
