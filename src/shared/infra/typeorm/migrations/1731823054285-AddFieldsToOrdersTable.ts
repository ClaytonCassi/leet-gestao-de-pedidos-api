import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddFieldsToOrdersTable1731823054285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar o campo comissaoFormaturaId
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'comissao_formatura_id',
            type: 'uuid',
            isNullable: true,
          })
        );
    
        // Criar a foreign key para comissaoFormaturaId
        await queryRunner.createForeignKey(
          'orders',
          new TableForeignKey({
            columnNames: ['comissao_formatura_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'graduation_commissions',
            onDelete: 'SET NULL',
          })
        );
    
        // Adicionar o campo tipoDesconto
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'tipo_desconto',
            type: 'varchar',
            isNullable: true,
            comment: 'Indica se foi usado CUPOM_FORMANDO_15 ou CUPOM_COMISSAO_35',
          })
        );
    
        // Adicionar o campo padraoDesconto
        await queryRunner.addColumn(
          'orders',
          new TableColumn({
            name: 'padrao_desconto',
            type: 'varchar',
            isNullable: true,
            comment: 'Padrão ou descrição do desconto aplicado',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a foreign key de comissaoFormaturaId
        const foreignKey = await queryRunner.getTable('orders').then((table) =>
          table?.foreignKeys.find((fk) => fk.columnNames.includes('comissao_formatura_id'))
        );
    
        if (foreignKey) {
          await queryRunner.dropForeignKey('orders', foreignKey);
        }
    
        // Remover o campo comissaoFormaturaId
        await queryRunner.dropColumn('orders', 'comissao_formatura_id');
    
        // Remover o campo tipoDesconto
        await queryRunner.dropColumn('orders', 'tipo_desconto');
    
        // Remover o campo padraoDesconto
        await queryRunner.dropColumn('orders', 'padrao_desconto');
      }

}
