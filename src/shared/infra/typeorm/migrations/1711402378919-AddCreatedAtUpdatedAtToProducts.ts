import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtUpdatedAtToProducts1711402378919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "products"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "products"
            DROP COLUMN "created_at",
            DROP COLUMN "updated_at"`
        );
    }

}
