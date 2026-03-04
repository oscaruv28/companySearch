import { EntityManager } from '@mikro-orm/postgresql';
import { Company, IdentificationType } from './company.entity.js';
import { CompanyRegistration } from './registration-log.entity.js';
import { CompanyDataDto } from './dto/ValidateResponse.dto.js';
import type { RegisterCompanyDto } from './dto/RegisterCompany.dto.js';
import type { ApiResponse } from './dto/api-response.dto.js';
import createError from 'http-errors';

export class CompaniesService {
    constructor(private readonly em: EntityManager) { }

    async validateNit(nit: string): Promise<ApiResponse> {
        const forkEm = this.em.fork();

        if (!/^[0-9]+$/.test(nit)) {
            throw new createError.BadRequest("El número de identificación debe contener únicamente dígitos.");
        }

        const company = await forkEm.findOne(Company, { nit });

        if (!company) {
            return this.formatResponse("El NIT no está registrado.", { canRegister: false, reason: "No encontrado" }, "1");
        }

        if (company.isBlocked) {
            throw new createError.Forbidden("Registro restringido.");
        }

        const alreadyRegistered = await forkEm.findOne(CompanyRegistration, { company: company.id });

        if (alreadyRegistered) {
            return this.formatResponse("Esta empresa ya completó su registro anteriormente.", { 
                canRegister: false, 
                reason: "Proceso de registro finalizado previamente." 
            }, "2");
        }

        return this.formatResponse("Habilitado para registro", {
            canRegister: true,
            companyData: CompanyDataDto.fromEntity(company)
        });
    }

    async register(data: RegisterCompanyDto): Promise<ApiResponse> {
        const forkEm = this.em.fork();
        const company = await forkEm.findOne(Company, { nit: data.nit });

        if (!company) {
            throw new createError.NotFound("Entidad no encontrada.");
        }

        const alreadyRegistered = await forkEm.findOne(CompanyRegistration, { company: company.id });
        if (alreadyRegistered) {
            throw new createError.Conflict("Esta empresa ya cuenta con un registro completado.");
        }

        this.validateBusinessRules(data);
        
        Object.assign(company, data);

        const registration = new CompanyRegistration();
        registration.company = company;

        try {
            await forkEm.persistAndFlush([company, registration]);
            
            return this.formatResponse("Registro exitoso", {
                id: company.id,
                registrationId: registration.id,
                updatedAt: company.updatedAt
            });
        } catch (error: any) {
            throw new createError.InternalServerError("Error al guardar los datos en el servidor.");
        }
    }

    private validateBusinessRules(data: RegisterCompanyDto) {
        const type = data.tipoIdentificacion;
        const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

        if (type === IdentificationType.NIT || type === 'IE') {
            if (!data.razonSocial) throw new createError.BadRequest("Razón Social es obligatoria.");
            if (data.razonSocial && !onlyLetters.test(data.razonSocial)) {
                throw new createError.BadRequest("La Razón Social no puede tener números.");
            }
        } else {
            if (!data.primerNombre || !data.primerApellido) {
                throw new createError.BadRequest("Nombres y Apellidos son obligatorios.");
            }
            if (data.primerNombre && !onlyLetters.test(data.primerNombre)) {
                throw new createError.BadRequest("El nombre no puede tener números.");
            }
        }
    }

    private formatResponse<T>(message: string, data: T, code: string = "0"): ApiResponse<T> {
        return {
            success: true,
            code,
            message,
            data
        };
    }
}