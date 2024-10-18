import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderTrackingTable1729227931756 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'order_tracking',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'nomeVendedor',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'nomeFuncionarioArte',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'dataEnvio',
                type: 'date',
                isNullable: false,
              },
              {
                name: 'statusPagamento',
                type: 'varchar',
                isNullable: false,
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
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_tracking');
      }

}
