import { EntityManager } from '@mikro-orm/postgresql';
import { Company, IdentificationType } from './company.entity.js';
import { CompanyRegistration } from './registration-log.entity.js';
import type { ValidateResponseDto } from './dto/ValidateResponse.dto.js';
import { CompanyDataDto } from './dto/ValidateResponse.dto.js';
import type { RegisterCompanyDto } from './dto/RegisterCompany.dto.js';

export class CompaniesService {
    constructor(private readonly em: EntityManager) { }

    async validateNit(nit: string): Promise<ValidateResponseDto> {
        const forkEm = this.em.fork();

        if (!/^[0-9]+$/.test(nit)) {
            throw new Error("El número de identificación debe contener únicamente dígitos.");
        }

        const company = await forkEm.findOne(Company, { nit });

        if (!company) {
            return this.buildValidateResponse(false, "El NIT no está registrado.", "1");
        }

        if (company.isBlocked) {
            return this.buildValidateResponse(false, "Registro restringido.", "403");
        }

        const alreadyRegistered = await forkEm.findOne(CompanyRegistration, { company: company.id });

        if (alreadyRegistered) {
            return {
                success: true,
                code: "2",
                message: "Esta empresa ya completó su registro anteriormente.",
                data: {
                    canRegister: false,
                    reason: "Proceso de registro finalizado previamente."
                }
            };
        }

        return {
            success: true,
            code: "0",
            message: "Habilitado para registro",
            data: {
                canRegister: true,
                companyData: CompanyDataDto.fromEntity(company)
            }
        };
    }

    async register(data: RegisterCompanyDto): Promise<any> {
        const forkEm = this.em.fork();
        const company = await forkEm.findOne(Company, { nit: data.nit });

        if (!company) throw new Error("Entidad no encontrada.");

        const alreadyRegistered = await forkEm.findOne(CompanyRegistration, { company: company.id });
        if (alreadyRegistered) throw new Error("Esta empresa ya cuenta con un registro completado.");

        this.validateBusinessRules(data);
        Object.assign(company, data);

        const registration = new CompanyRegistration();
        registration.company = company;

        try {
            await forkEm.persistAndFlush([company, registration]);
            return {
                success: true,
                code: "0",
                message: "Registro exitoso",
                data: {
                    id: company.id,
                    registrationId: registration.id,
                    updatedAt: company.updatedAt
                }
            };
        } catch (error: any) {
            throw new Error("Error al guardar: la empresa ya está registrada.");
        }
    }

    private buildValidateResponse(canRegister: boolean, reason: string, code: string): ValidateResponseDto {
        return {
            success: true,
            code,
            message: "Consulta finalizada",
            data: { canRegister, reason }
        };
    }

    private validateBusinessRules(data: RegisterCompanyDto) {
        const type = data.tipoIdentificacion;
        const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

        if (type === IdentificationType.NIT || type === 'IE') {
            if (!data.razonSocial) throw new Error("Razón Social es obligatoria.");
            if (data.razonSocial && !onlyLetters.test(data.razonSocial)) {
                throw new Error("La Razón Social no puede tener números.");
            }
        } else {
            if (!data.primerNombre || !data.primerApellido) {
                throw new Error("Nombres y Apellidos son obligatorios.");
            }
            if (data.primerNombre && !onlyLetters.test(data.primerNombre)) {
                throw new Error("El nombre no puede tener números.");
            }
        }
    }
}