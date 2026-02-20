import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'company_registrations' })
export class CompanyRegistration {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @OneToOne({ entity: 'Company', fieldName: 'company_id', unique: true, deleteRule: 'cascade' })
  company!: any; 

  @Property({ type: 'datetime' })
  registrationDate: Date = new Date();
}