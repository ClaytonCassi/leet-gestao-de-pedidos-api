import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddOrderNumberAndSellerToOrders1722200503216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('orders', [
          new TableColumn({
            name: 'numeroPedido',
            type: 'varchar',
            isNullable: true,
          }),
          new TableColumn({
            name: 'nomeVendedor',
            type: 'varchar',
            isNullable: true,
          }),
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'numeroPedido');
        await queryRunner.dropColumn('orders', 'nomeVendedor');
      }

}
