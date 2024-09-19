import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPaymentMethodToOrders1716678458465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'formaPagamento',
            type: 'varchar',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'formaPagamento');
      }

}
