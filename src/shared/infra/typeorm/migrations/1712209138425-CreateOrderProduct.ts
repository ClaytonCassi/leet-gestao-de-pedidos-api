import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderProduct1712209138425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`, // Isso depende do seu DB. Para Postgres, por exemplo.
                },
                {
                    name: 'orderId',
                    type: 'uuid',
                },
                {
                    name: 'productId',
                    type: 'uuid',
                },
                {
                    name: 'quantidade',
                    type: 'int',
                    isNullable: false,
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
                    columnNames: ['orderId'],
                    referencedTableName: 'orders',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['productId'],
                    referencedTableName: 'products',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_products');
    }


}
