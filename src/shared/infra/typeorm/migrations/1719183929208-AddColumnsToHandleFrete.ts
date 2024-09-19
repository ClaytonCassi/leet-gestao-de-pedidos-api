import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsToHandleFrete1719183929208 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('product_prices', [
      new TableColumn({
        name: 'height',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'width',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'depth',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'weight',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'volume',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'stackable',
        type: 'boolean',
        isNullable: true,
      }),
      new TableColumn({
        name: 'stackingFactor',
        type: 'float',
        isNullable: true,
      }),
      new TableColumn({
        name: 'pairingFactor',
        type: 'json',
        isNullable: true,
      }),
    ]);

    // Preencher colunas com valores padrão
    await queryRunner.query(`UPDATE product_prices SET "height" = 0 WHERE "height" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "width" = 0 WHERE "width" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "depth" = 0 WHERE "depth" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "weight" = 0 WHERE "weight" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "volume" = 0 WHERE "volume" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "stackable" = false WHERE "stackable" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "stackingFactor" = 1 WHERE "stackingFactor" IS NULL`);
    await queryRunner.query(`UPDATE product_prices SET "pairingFactor" = '{"height": 0, "width": 0, "depth": 0}' WHERE "pairingFactor" IS NULL`);

    // Alterar colunas para NOT NULL
    await queryRunner.changeColumn('product_prices', 'height', new TableColumn({
      name: 'height',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'width', new TableColumn({
      name: 'width',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'depth', new TableColumn({
      name: 'depth',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'weight', new TableColumn({
      name: 'weight',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'volume', new TableColumn({
      name: 'volume',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'stackable', new TableColumn({
      name: 'stackable',
      type: 'boolean',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'stackingFactor', new TableColumn({
      name: 'stackingFactor',
      type: 'float',
      isNullable: false,
    }));
    await queryRunner.changeColumn('product_prices', 'pairingFactor', new TableColumn({
      name: 'pairingFactor',
      type: 'json',
      isNullable: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('product_prices', [
      new TableColumn({
        name: 'height',
        type: 'float',
      }),
      new TableColumn({
        name: 'width',
        type: 'float',
      }),
      new TableColumn({
        name: 'depth',
        type: 'float',
      }),
      new TableColumn({
        name: 'weight',
        type: 'float',
      }),
      new TableColumn({
        name: 'volume',
        type: 'float',
      }),
      new TableColumn({
        name: 'stackable',
        type: 'boolean',
      }),
      new TableColumn({
        name: 'stackingFactor',
        type: 'float',
      }),
      new TableColumn({
        name: 'pairingFactor',
        type: 'json',
      }),
    ]);
  }
}
