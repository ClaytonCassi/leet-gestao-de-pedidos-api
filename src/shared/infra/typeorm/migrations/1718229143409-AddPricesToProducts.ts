import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPricesToProducts1718229143409 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'products',
          new TableColumn({
            name: 'prices',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'prices');
      }

}
