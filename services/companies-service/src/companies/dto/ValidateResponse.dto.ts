import { Company } from '../company.entity.js';

export class CompanyDataDto {
  nit!: string;
  tipoIdentificacion!: string;
  razonSocial?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  email!: string;
  celular?: string;
  autorizaCelular!: boolean;
  autorizaEmail!: boolean;

  static fromEntity(entity: Company): CompanyDataDto {
    const dto = new CompanyDataDto();
    Object.assign(dto, {
      nit: entity.nit,
      tipoIdentificacion: entity.tipoIdentificacion,
      razonSocial: entity.razonSocial,
      primerNombre: entity.primerNombre,
      segundoNombre: entity.segundoNombre,
      primerApellido: entity.primerApellido,
      segundoApellido: entity.segundoApellido,
      email: entity.email,
      celular: entity.celular,
      autorizaCelular: entity.autorizaCelular,
      autorizaEmail: entity.autorizaEmail,
    });
    return dto;
  }
}

export interface ValidateResponseDto {
  success: boolean;
  code: string;
  message: string;
  data: {
    canRegister: boolean;
    reason?: string;
    companyData?: CompanyDataDto;
  } | null;
}