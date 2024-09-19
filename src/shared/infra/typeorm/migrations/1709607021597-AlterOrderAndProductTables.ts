import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterOrderAndProductTables1709607021597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adiciona a coluna 'imagem' na tabela 'orders'
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD COLUMN "imagem" BYTEA
        `);

        // Remove a coluna 'imagem' da tabela 'products'
        await queryRunner.query(`
            ALTER TABLE "products"
            DROP COLUMN "imagem"
        `);

        // Move a coluna 'valorUnitario' de 'orders' para 'products'
        await queryRunner.query(`
            ALTER TABLE "orders"
            DROP COLUMN "valorUnitario"
        `);

        await queryRunner.query(`
            ALTER TABLE "products"
            ADD COLUMN "valorUnitario" NUMERIC
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverte as alterações feitas no método up()
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD COLUMN "imagem" BYTEA
        `);

        await queryRunner.query(`
            ALTER TABLE "orders"
            DROP COLUMN "imagem"
        `);

        await queryRunner.query(`
            ALTER TABLE "products"
            DROP COLUMN "valorUnitario"
        `);

        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD COLUMN "valorUnitario" NUMERIC
        `);
    }

}
