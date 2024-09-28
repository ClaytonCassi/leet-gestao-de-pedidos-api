import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNomeDesignerToOrders1727561698223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "orders", 
          new TableColumn({
            name: "nomeDesigner",
            type: "varchar",
            isNullable: true, 
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "nomeDesigner");
      }

}
