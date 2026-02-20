export interface CompanyData {
  nit: string;
  razonSocial: string;
  tipoIdentificacion: string;
}

export interface ValidationResponse {
  canRegister: boolean;
  companyData?: CompanyData;
  reason?: string;
}

export interface RegistrationPayload {
  tipoIdentificacion: string;
  nit: string;
  razonSocial?: string;
  primerNombre?: string;
  primerApellido?: string;
  email: string;
  autorizaCelular: boolean;
  autorizaEmail: boolean;
}