import { Migration } from '@mikro-orm/migrations';

export class Migration20260220055355 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "company_registrations" ("id" uuid not null, "company_id" uuid not null, "registration_date" timestamptz not null, constraint "company_registrations_pkey" primary key ("id"));`);
    this.addSql(`alter table "company_registrations" add constraint "company_registrations_company_id_unique" unique ("company_id");`);

    this.addSql(`alter table "company_registrations" add constraint "company_registrations_company_id_foreign" foreign key ("company_id") references "company" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "company_registrations" cascade;`);
  }

}
