import { MigrationInterface, QueryRunner } from 'typeorm';

export class Menus1684830575943 implements MigrationInterface {
  name = 'Menus1684830575943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`menu\` ADD \`acl\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`acl\``);
  }
}
