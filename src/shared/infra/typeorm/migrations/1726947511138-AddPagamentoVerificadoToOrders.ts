import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPagamentoVerificadoToOrders1726947511138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'pagamentoVerificado',
            type: 'varchar',
            length: '20',
            isNullable: true, 
            default: `'não confirmado'`, 
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'pagamentoVerificado');
      }

}
