import { Entity, Property, PrimaryKey, Unique, Enum } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

export enum IdentificationType {
  NIT = 'NIT',
  CC = 'CC',
  CE = 'CE',
  IE = 'IE',
}

@Entity()
export class Company {
  @PrimaryKey({ type: 'uuid' }) 
  id: string = uuidv4();

  @Enum({ items: () => IdentificationType }) 
  tipoIdentificacion!: IdentificationType;

  @Property({ type: 'string' })
  @Unique()
  nit!: string;

  @Property({ type: 'string', nullable: true })
  razonSocial?: string; 

  @Property({ type: 'string', nullable: true })
  primerNombre?: string;

  @Property({ type: 'string', nullable: true })
  segundoNombre?: string;

  @Property({ type: 'string', nullable: true })
  primerApellido?: string;

  @Property({ type: 'string', nullable: true })
  segundoApellido?: string;

  @Property({ type: 'boolean', default: false })
  isBlocked: boolean = false;

  @Property({ type: 'string' })
  @Unique()
  email!: string;

  @Property({ type: 'string', nullable: true })
  celular?: string;

  @Property({ type: 'boolean', default: false })
  autorizaCelular: boolean = false;

  @Property({ type: 'boolean', default: false })
  autorizaEmail: boolean = false;

  @Property({ type: 'datetime' })
  createdAt: Date = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}