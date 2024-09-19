import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProductTable1711398842637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Aqui você coloca o SQL para realizar as alterações necessárias
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "quantidade"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "valorUnitario" TO "custo"`);
        await queryRunner.query(`ALTER TABLE "products" ADD COLUMN "codigo" varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aqui você coloca o SQL para desfazer as alterações caso necessário
        await queryRunner.query(`ALTER TABLE "products" ADD COLUMN "quantidade" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD COLUMN "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "custo" TO "valorUnitario"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "codigo"`);
    }

}
