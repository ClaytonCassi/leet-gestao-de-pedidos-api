import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrderTable1699302873307
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cliente',
            type: 'varchar',
          },
          {
            name: 'dataPedido',
            type: 'date',
          },
          {
            name: 'celular',
            type: 'varchar',
          },
          {
            name: 'numeroArte',
            type: 'varchar',
          },
          {
            name: 'dataEvento',
            type: 'date',
          },
          {
            name: 'valorFrete',
            type: 'decimal',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'prazo',
            type: 'varchar',
          },
          {
            name: 'rua',
            type: 'varchar',
          },
          {
            name: 'valorTotal',
            type: 'decimal',
          },
          {
            name: 'valorUnitario',
            type: 'decimal',
          },
          {
            name: 'valorSinal',
            type: 'decimal',
          },
          {
            name: 'faltaPagar',
            type: 'decimal',
          },
          {
            name: 'dataEntrega',
            type: 'date',
          },
          {
            name: 'observacao',
            type: 'text',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
