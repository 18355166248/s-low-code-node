import { MigrationInterface, QueryRunner } from 'typeorm';

export class Project1685504346640 implements MigrationInterface {
  name = 'Project1685504346640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_7c4b0d3b77eaf26f8b4da879e63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`userId\` \`user_projects\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`user_projects\``,
    );
    await queryRunner.query(`ALTER TABLE \`project\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`user_projects\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_51737bd1f0424285de8f7a495c7\` FOREIGN KEY (\`user_projects\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_51737bd1f0424285de8f7a495c7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_7c4b0d3b77eaf26f8b4da879e63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`user_projects\``,
    );
    await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`user_projects\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`user_projects\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
