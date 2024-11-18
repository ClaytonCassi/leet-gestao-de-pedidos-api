import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateIntegrantesTable1731727637359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'integrantes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'telefone',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'instagram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'graduation_commission_id',
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
          },
        ],
      }),
    );

  
    await queryRunner.createForeignKey(
      'integrantes',
      new TableForeignKey({
        columnNames: ['graduation_commission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'graduation_commissions',
        onDelete: 'CASCADE',
      }),
    );


    await queryRunner.dropColumn('graduation_commissions', 'integrantes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropTable('integrantes');

    await queryRunner.addColumn(
      'graduation_commissions',
      new TableColumn({
        name: 'integrantes',
        type: 'json',
        isNullable: true,
      }),
    );
  }
}
