import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AdjustUnitPriceField1714163555776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Removendo o campo valorUnitario da tabela orders
        await queryRunner.dropColumn('orders', 'valorUnitario');

        // Adicionando o campo valorUnitario na tabela order_products
        await queryRunner.addColumn('order_products', new TableColumn({
            name: 'valorUnitario',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Adicionando novamente o campo valorUnitario na tabela orders
        await queryRunner.addColumn('orders', new TableColumn({
            name: 'valorUnitario',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0
        }));

        // Removendo o campo valorUnitario da tabela order_products
        await queryRunner.dropColumn('order_products', 'valorUnitario');
    }
}
