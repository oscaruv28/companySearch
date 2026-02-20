import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
// NO importes Company aquí si vas a usar el string en el decorador

@Entity({ tableName: 'company_registrations' })
export class CompanyRegistration {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  // Usamos el nombre de la entidad como string 'Company' para romper la dependencia circular
  @OneToOne({ entity: 'Company', fieldName: 'company_id', unique: true, deleteRule: 'cascade' })
  company!: any; 

  @Property({ type: 'datetime' })
  registrationDate: Date = new Date();
}