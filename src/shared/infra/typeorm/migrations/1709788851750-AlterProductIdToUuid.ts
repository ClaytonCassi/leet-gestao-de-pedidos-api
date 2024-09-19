import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterProductIdToUuid1709788851750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna `id` atual
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);

        // Adicionar a nova coluna `id` com tipo `uuid` e definir como chave primária
        await queryRunner.query(`ALTER TABLE "products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_products" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna `id` de tipo `uuid`
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "PK_products"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);

        // Re-adicionar a coluna `id` com tipo numérico
        await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_products" PRIMARY KEY ("id")`);
    }

}
