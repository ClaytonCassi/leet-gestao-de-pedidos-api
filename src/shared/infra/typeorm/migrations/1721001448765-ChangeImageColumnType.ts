import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeImageColumnType1721001448765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'imagemUrl',
            type: 'varchar',
            isNullable: true,
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'imagemUrl');
      }
}
