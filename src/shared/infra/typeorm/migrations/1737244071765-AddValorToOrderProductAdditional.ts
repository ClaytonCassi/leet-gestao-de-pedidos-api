import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddValorToOrderProductAdditional1737244071765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1) Adicionar a coluna 'valor' na tabela 'order_product_additionals'
        await queryRunner.addColumn(
          'order_product_additionals',
          new TableColumn({
            name: 'valor',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true, // permitir null para não quebrar inserções antigas
          }),
        );
    
        // 2) Popular registros antigos (opcional)
        //    Aqui usamos um UPDATE com JOINs para tentar descobrir a faixa de preço
        //    e atualizar o "valor" com base em (preco * quantidade).
        //    Ajuste nomes de colunas / relacionamentos conforme seu BD real.
        await queryRunner.query(`
            UPDATE order_product_additionals
            SET valor = subquery.calculated_value
            FROM (
              SELECT 
                opa."id" AS opa_id,
                ap.preco * op.quantidade AS calculated_value
              FROM order_product_additionals opa
              INNER JOIN order_products op ON opa."orderProductId" = op.id
              INNER JOIN orders o ON op."orderId" = o.id
              INNER JOIN additionals a ON a.id = opa."adicionalId"
              INNER JOIN additional_prices ap ON ap.additional_id = a.id
              WHERE o."dataPedido" IS NOT NULL
                AND ap.quantidade_min <= op.quantidade
                AND (
                  ap.quantidade_max IS NULL
                  OR ap.quantidade_max >= op.quantidade
                )
            ) AS subquery
            WHERE order_product_additionals.id = subquery.opa_id;
          `);
    
        // Se desejar impedir que fique null em pedidos novos (pós-migração),
        // você poderia alterar a coluna para NOT NULL:
        // await queryRunner.changeColumn(
        //   'order_product_additionals',
        //   'valor',
        //   new TableColumn({
        //     name: 'valor',
        //     type: 'decimal',
        //     precision: 10,
        //     scale: 2,
        //     isNullable: false,
        //     default: 0,
        //   }),
        // );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter
        await queryRunner.query(`
          ALTER TABLE order_product_additionals
          DROP COLUMN valor
        `);
      }

}
