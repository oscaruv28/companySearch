import { Migration } from '@mikro-orm/migrations';

export class Migration20260220054127 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "company" add column "is_blocked" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "company" drop column "is_blocked";`);
  }

}
