import { Router } from 'express';
import { CompaniesController } from './companies.controller.js';
import { CompaniesService } from './companies.service.js';
import { EntityManager } from '@mikro-orm/postgresql';

export const createCompaniesRouter = (em: EntityManager) => {
  const router = Router();
  
  const service = new CompaniesService(em);
  const controller = new CompaniesController(service);

  /**
   * PASO 1: Validar NIT
   * GET /api/companies/validate/:nit
   */
  router.get('/validate/:nit', controller.validate);

  /**
   * PASO 4: Registro final
   * POST /api/companies/register
   */
  router.post('/register', controller.register);

  return router;
};