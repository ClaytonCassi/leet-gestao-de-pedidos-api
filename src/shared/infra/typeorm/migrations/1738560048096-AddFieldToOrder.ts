import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldToOrder1738560048096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("orders", [
            new TableColumn({
                name: "status",
                type: "varchar",
                isNullable: true,
            }),
            new TableColumn({
                name: "setor",
                type: "varchar",
                isNullable: true,
            }),
            new TableColumn({
                name: "qrcode",
                type: "varchar",
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "status");
        await queryRunner.dropColumn("orders", "setor");
        await queryRunner.dropColumn("orders", "qrcode");
    }

}
