import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddGraduationCommissionTable1731577335069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'graduation_commissions',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'cupom',
                type: 'varchar',
              },
              {
                name: 'nomeCurso',
                type: 'varchar',
              },
              {
                name: 'dataEvento',
                type: 'date',
              },
              {
                name: 'quantidadeIntegrantes',
                type: 'int',
              },
              {
                name: 'quantidadeFormandos',
                type: 'int',
              },
              {
                name: 'quantidadePedido',
                type: 'int',
              },
              {
                name: 'vendedor',
                type: 'varchar',
              },
              {
                name: 'estado',
                type: 'varchar',
              },
              {
                name: 'cep',
                type: 'varchar',
              },
              {
                name: 'nomeResponsavel',
                type: 'varchar',
              },
              {
                name: 'contatoResponsavel',
                type: 'varchar',
              },
              {
                name: 'documentoAssinaturaUrl',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'integrantes',
                type: 'json',
                isNullable: true,
              },
              {
                name: 'quantidadeCuponsAtivados',
                type: 'int',
                default: 0,
              },
              {
                name: 'quantidadePedidosRealizados',
                type: 'int',
                default: 0,
              },
              {
                name: 'quantidadeEmAtendimento',
                type: 'int',
                default: 0,
              },
              {
                name: 'quantidadeEmFaseDaArte',
                type: 'int',
                default: 0,
              },
              {
                name: 'observacao',
                type: 'varchar',
                isNullable: true,
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('graduation_commissions');
      }

}
