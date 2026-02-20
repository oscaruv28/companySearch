import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';
import { createCompaniesRouter } from './companies/companies.routes.js';
import type { EntityManager } from '@mikro-orm/postgresql';

export const createApp = (em: EntityManager) => {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Swagger UI - Disponible en http://localhost:3000/api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Rutas
  app.use('/api/companies', createCompaniesRouter(em));

  // Ruta de salud simple
  app.get('/health', (req, res) => res.json({ status: 'up' }));

  return app;
};