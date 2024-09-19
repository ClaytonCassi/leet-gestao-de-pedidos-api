import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyOrderTable1702942410534 implements MigrationInterface {
  name = 'ModifyOrderTable1702942410534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataPedido" TYPE date`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataEvento" TYPE date`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataEntrega" TYPE date`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataPedido" TYPE timestamp with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataEvento" TYPE timestamp with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "dataEntrega" TYPE timestamp with time zone`,
    );
  }
}
