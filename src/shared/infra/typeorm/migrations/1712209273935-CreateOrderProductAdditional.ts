import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderProductAdditional1712209273935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_product_additionals',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`,
                },
                {
                    name: 'orderProductId',
                    type: 'uuid',
                },
                {
                    name: 'adicionalId',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['orderProductId'],
                    referencedTableName: 'order_products',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['adicionalId'],
                    referencedTableName: 'additionals',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_product_additionals');
    }

}
