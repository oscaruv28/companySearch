import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';
import { createCompaniesRouter } from './companies/companies.routes.js';
import type { EntityManager } from '@mikro-orm/postgresql';

export const createApp = (em: EntityManager) => {
  const app = express();

  // 1. MIDDLEWARES
  app.use(cors());
  app.use(express.json());

  // 2. SWAGGER Y RUTAS
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/api/companies', createCompaniesRouter(em));
  app.get('/health', (req, res) => res.json({ status: 'up' }));

  // 3. MANEJO DE ERRORES
  // Parámetros: (err, req, res, next)
  app.use((err: any, req: any, res: any, next: any) => {
    const status = err.status || 500;
    
    res.status(status).json({
      success: false,
      code: status.toString(),
      message: err.message || 'Internal Server Error'
    });
  });

  return app;
};