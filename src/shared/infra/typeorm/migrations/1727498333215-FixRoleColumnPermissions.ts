import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class FixRoleColumnPermissions1727498333215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove a coluna 'role' se existir com configurações erradas
        await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS role`);
    
        // Recria a coluna 'role' sem restrições de readonly
        await queryRunner.addColumn(
          'users',
          new TableColumn({
            name: 'role',
            type: 'varchar',
            isNullable: true,
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfazendo a alteração, remove a coluna 'role'
        await queryRunner.dropColumn('users', 'role');
      }

}
