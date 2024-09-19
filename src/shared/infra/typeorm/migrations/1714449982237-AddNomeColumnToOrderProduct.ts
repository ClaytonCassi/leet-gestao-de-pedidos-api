import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNomeColumnToOrderProduct1714449982237 implements MigrationInterface {

    // up() method
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_products" ADD "nome" varchar NOT NULL DEFAULT ''`);
  }
  
  // down() method
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "nome"`);
  }

}
