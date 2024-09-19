import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdditionalsTable1711482196334 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "additionals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" varchar NOT NULL,
                "codigo" varchar NOT NULL,
                "custo" varchar NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "additionals"
        `);
    }

}
