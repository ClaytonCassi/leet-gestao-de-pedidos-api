import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateValorUnitario1712198294082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionando o campo valorUnitario
        await queryRunner.query(`ALTER TABLE "orders" ADD IF NOT EXISTS "valorUnitario" DECIMAL NOT NULL DEFAULT 0`);

        // Exemplo de remoção de uma coluna obsoleta
        // await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN IF EXISTS "colunaObsoleta"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revertendo a adição do campo valorUnitario
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "valorUnitario"`);

        // Exemplo de adição da coluna removida no up
        // await queryRunner.query(`ALTER TABLE "orders" ADD "colunaObsoleta" TIPO_DA_COLUNA`);
    }

}
