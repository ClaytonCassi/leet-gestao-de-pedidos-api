import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProductsTable1701294659417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'quantidade',
            type: 'int',
          },
          {
            name: 'imagem',
            type: 'bytea', // 'bytea' para PostgreSQL, pode variar dependendo do banco de dados
            isNullable: true,
          },
          {
            name: 'orderId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['orderId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
