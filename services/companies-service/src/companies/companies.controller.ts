import type { Request, Response } from 'express';
import { CompaniesService } from './companies.service.js';
import type { RegisterCompanyDto } from './dto/RegisterCompany.dto.js';
import type { ValidateResponseDto } from './dto/ValidateResponse.dto.js';

export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) { }

    register = async (req: Request, res: Response) => {
        try {
            console.log("BODY RECIBIDO:", req.body);

            const companyData: RegisterCompanyDto = req.body;
            const result = await this.companiesService.register(companyData);

            console.log("RESULTADO SERVICIO:", result);
            res.status(201).json(result);
        } catch (error: any) {
            console.error("ERROR EN REGISTER:", error.message);

            res.status(400).json({
                success: false,
                code: "400",
                message: error.message || 'Error al procesar el registro'
            });
        }
    };

    validate = async (req: Request, res: Response) => {
        try {
            const { nit } = req.params as { nit: string };
            const result = await this.companiesService.validateNit(nit);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({
                success: false,
                code: "400",
                message: error.message || 'Error al validar el NIT'
            });
        }
    };
}