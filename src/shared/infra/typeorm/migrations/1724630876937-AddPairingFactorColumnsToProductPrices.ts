import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPairingFactorColumnsToProductPrices1724630876937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover a coluna JSON pairingFactor
        await queryRunner.dropColumn('product_prices', 'pairingFactor');
    
        // Adicionar novas colunas separadas
        await queryRunner.addColumns('product_prices', [
          new TableColumn({
            name: 'pairing_height',
            type: 'float',
            isNullable: true, // Se os valores podem ser nulos
            default: 0,       // Valor padrão, se necessário
          }),
          new TableColumn({
            name: 'pairing_width',
            type: 'float',
            isNullable: true,
            default: 0,
          }),
          new TableColumn({
            name: 'pairing_depth',
            type: 'float',
            isNullable: true,
            default: 0,
          }),
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover as colunas separadas individualmente
        await queryRunner.dropColumn('product_prices', 'pairing_height');
        await queryRunner.dropColumn('product_prices', 'pairing_width');
        await queryRunner.dropColumn('product_prices', 'pairing_depth');
    
        // Adicionar de volta a coluna JSON pairingFactor
        await queryRunner.addColumn('product_prices', new TableColumn({
          name: 'pairingFactor',
          type: 'json',
          isNullable: true,
        }));
      }

}
