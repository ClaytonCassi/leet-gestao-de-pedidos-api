import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNomeClienteAndCelularClienteToOrderTracking1729233971686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('order_tracking', [
          new TableColumn({
            name: 'nomeCliente',
            type: 'varchar',
            isNullable: true, 
          }),
          new TableColumn({
            name: 'celularCliente',
            type: 'varchar',
            isNullable: true,
          }),
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_tracking', 'nomeCliente');
        await queryRunner.dropColumn('order_tracking', 'celularCliente');
      }

}
