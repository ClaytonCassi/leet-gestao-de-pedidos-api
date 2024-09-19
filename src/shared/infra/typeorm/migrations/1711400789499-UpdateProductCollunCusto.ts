import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProductCollunCusto1711400789499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "products" ALTER COLUMN "custo" TYPE varchar`,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `ALTER TABLE "products" ALTER COLUMN "custo" TYPE decimal`,
          );
    }

}
