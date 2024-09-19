import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPricesToAdditionals1718229169812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'additionals',
          new TableColumn({
            name: 'prices',
            type: 'json',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('additionals', 'prices');
      }

}
