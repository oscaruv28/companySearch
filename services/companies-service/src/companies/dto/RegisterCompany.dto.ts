import { IsString, IsEmail, IsBoolean, IsOptional, IsNotEmpty, Matches, IsEnum } from 'class-validator';

export enum IdentificationType {
  NIT = 'NIT',
  CC = 'CC',
  CE = 'CE',
  IE = 'IE',
}

export class RegisterCompanyDto {
  @IsEnum(IdentificationType, { message: 'Tipo de identificación no válido. Use: NIT, CC, CE o IE' })
  @IsNotEmpty()
  tipoIdentificacion!: IdentificationType;

  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'El número de identificación solo debe contener números' })
  nit!: string; 

  @IsOptional()
  @IsString()
  razonSocial?: string;

  @IsOptional()
  @IsString()
  primerNombre?: string;

  @IsOptional()
  @IsString()
  segundoNombre?: string; 

  @IsOptional()
  @IsString()
  primerApellido?: string;

  @IsOptional()
  @IsString()
  segundoApellido?: string;

  @IsEmail({}, { message: 'El formato del email no es válido' })
  email!: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsBoolean()
  autorizaCelular!: boolean;

  @IsBoolean()
  autorizaEmail!: boolean;
}