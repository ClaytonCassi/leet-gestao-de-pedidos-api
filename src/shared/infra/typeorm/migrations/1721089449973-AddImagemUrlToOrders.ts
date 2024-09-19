import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImagemUrlToOrders1721089449973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna 'imagem' se ela existir
        await queryRunner.query(`
            ALTER TABLE orders DROP COLUMN IF EXISTS imagem;
        `);

        // Renomear a coluna 'imagemUrl' para 'imagem' se ela existir
        await queryRunner.query(`
            ALTER TABLE orders RENAME COLUMN "imagemUrl" TO imagem;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Renomear a coluna 'imagem' de volta para 'imagemUrl' se ela existir
        await queryRunner.query(`
            ALTER TABLE orders RENAME COLUMN imagem TO "imagemUrl";
        `);

        // Adicionar novamente a coluna 'imagem' como BYTEA se ela não existir
        await queryRunner.query(`
            ALTER TABLE orders ADD COLUMN IF NOT EXISTS imagem BYTEA;
        `);
    }
}
