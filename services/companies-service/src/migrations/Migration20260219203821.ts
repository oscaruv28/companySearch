import { Migration } from '@mikro-orm/migrations';

export class Migration20260219203821 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "company" drop column "can_register", drop column "reason";`);

    this.addSql(`alter table "company" add constraint "company_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "company" drop constraint "company_email_unique";`);

    this.addSql(`alter table "company" add column "can_register" bool not null default true, add column "reason" varchar(255) null;`);
  }

}
