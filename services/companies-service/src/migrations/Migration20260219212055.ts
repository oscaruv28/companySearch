import { Migration } from '@mikro-orm/migrations';

export class Migration20260219212055 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "company" alter column "tipo_identificacion" type text using ("tipo_identificacion"::text);`);
    this.addSql(`alter table "company" add constraint "company_tipo_identificacion_check" check("tipo_identificacion" in ('NIT', 'CC', 'CE', 'IE'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "company" drop constraint if exists "company_tipo_identificacion_check";`);

    this.addSql(`alter table "company" alter column "tipo_identificacion" type varchar(255) using ("tipo_identificacion"::varchar(255));`);
  }

}
