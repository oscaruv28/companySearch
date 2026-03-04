import type { NextFunction, Request, Response } from 'express';
import { CompaniesService } from './companies.service.js';
import type { RegisterCompanyDto } from './dto/RegisterCompany.dto.js';

export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) { }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const companyData: RegisterCompanyDto = req.body;
            const result = await this.companiesService.register(companyData);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    validate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nit } = req.params as { nit: string };
            const result = await this.companiesService.validateNit(nit);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
}