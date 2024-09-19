import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProductPrices1718228899199 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_prices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'faixa',
            type: 'varchar',
          },
          {
            name: 'quantidade_min',
            type: 'int',
          },
          {
            name: 'quantidade_max',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'preco',
            type: 'decimal',
            precision: 10,
            scale: 2,
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

    await queryRunner.createForeignKey(
      'product_prices',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_prices');
  }

}
